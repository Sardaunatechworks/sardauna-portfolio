<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Profile;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Technology;
use App\Models\Skill;
use App\Models\Certification;

class MigrateSupabaseCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'portfolio:migrate-supabase 
                            {--file= : Path to local JSON export file}
                            {--url= : Supabase project URL (e.g. https://xyz.supabase.co)}
                            {--key= : Supabase service role or anon key}
                            {--download-media : Download media files from Supabase Storage into local storage}
                            {--truncate : Truncate portfolio tables before importing}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate data and media assets from Supabase into Laravel MySQL database';

    public function handle(): int
    {
        $this->info('====================================================');
        $this->info('  Muhammad Auwal Abubakar Portfolio');
        $this->info('  Supabase to Laravel 13 & MySQL Migration Engine');
        $this->info('====================================================');

        $filePath = $this->option('file');
        $supabaseUrl = rtrim($this->option('url') ?: env('SUPABASE_URL', env('VITE_SUPABASE_URL', '')), '/');
        $supabaseKey = $this->option('key') ?: env('SUPABASE_SERVICE_ROLE_KEY', env('VITE_SUPABASE_ANON_KEY', ''));
        $shouldDownloadMedia = (bool) $this->option('download-media');
        $shouldTruncate = (bool) $this->option('truncate');

        $data = null;

        if ($filePath && file_exists($filePath)) {
            $this->info("Loading export payload from file: {$filePath}");
            $raw = file_get_contents($filePath);
            $data = json_decode($raw, true);
        } elseif ($supabaseUrl && $supabaseKey) {
            $this->info("Fetching data directly from Supabase REST API: {$supabaseUrl}");
            $data = $this->fetchFromSupabaseRest($supabaseUrl, $supabaseKey);
        } else {
            // Check default export location
            $defaultFile = storage_path('app/supabase_export.json');
            if (file_exists($defaultFile)) {
                $this->info("Loading default export from {$defaultFile}");
                $data = json_decode(file_get_contents($defaultFile), true);
            } else {
                $this->warn('No Supabase credentials or JSON file provided.');
                $this->line('Using built-in baseline dataset derived from the portfolio audit.');
                $data = $this->getBaselineDataset();
            }
        }

        if (!$data || !is_array($data)) {
            $this->error('Failed to resolve valid migration data payload.');
            return self::FAILURE;
        }

        if ($shouldTruncate) {
            $this->warn('Truncating existing portfolio records...');
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::table('project_technology')->truncate();
            DB::table('projects')->truncate();
            DB::table('experiences')->truncate();
            DB::table('skills')->truncate();
            DB::table('certifications')->truncate();
            DB::table('profiles')->truncate();
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

        DB::beginTransaction();
        try {
            // 1. Migrate Profile / Personal Info
            $this->migrateProfile($data['personal_info'] ?? [], $supabaseUrl, $shouldDownloadMedia);

            // 2. Migrate Work Experiences
            $this->migrateExperiences($data['experience'] ?? []);

            // 3. Migrate Projects and Technologies
            $this->migrateProjects($data['projects'] ?? [], $supabaseUrl, $shouldDownloadMedia);

            // 4. Migrate Technical Skills
            $this->migrateSkills($data['skills'] ?? []);

            // 5. Migrate Certifications
            $this->migrateCertifications($data['certifications'] ?? []);

            DB::commit();
            $this->info('✓ Data migration and transaction successfully committed.');
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->error('Migration failed with error: ' . $e->getMessage());
            $this->error($e->getTraceAsString());
            return self::FAILURE;
        }

        // Summary validation output
        $this->printSummary();

        return self::SUCCESS;
    }

    protected function fetchFromSupabaseRest(string $url, string $key): array
    {
        $tables = ['personal_info', 'experience', 'projects', 'skills', 'certifications'];
        $result = [];

        foreach ($tables as $table) {
            $this->line(" -> Querying {$table}...");
            try {
                $response = Http::withHeaders([
                    'apikey' => $key,
                    'Authorization' => "Bearer {$key}",
                    'Accept' => 'application/json',
                ])->timeout(15)->get("{$url}/rest/v1/{$table}?select=*");

                if ($response->successful()) {
                    $result[$table] = $response->json();
                    $this->line("    Received " . count($result[$table]) . " records from {$table}.");
                } else {
                    $this->warn("    Failed to fetch {$table}: HTTP {$response->status()}");
                    $result[$table] = [];
                }
            } catch (\Throwable $e) {
                $this->warn("    Network error fetching {$table}: " . $e->getMessage());
                $result[$table] = [];
            }
        }

        return $result;
    }

    protected function migrateProfile(array $infoList, string $supabaseUrl, bool $downloadMedia): void
    {
        $info = is_array($infoList) && isset($infoList[0]) ? $infoList[0] : $infoList;
        if (empty($info)) {
            $this->line('Skipping profile (empty payload).');
            return;
        }

        $avatarUrl = $info['profile_pic'] ?? null;
        if ($downloadMedia && $avatarUrl && Str::contains($avatarUrl, 'supabase.co/storage')) {
            $avatarUrl = $this->downloadSupabaseAsset($avatarUrl, 'profiles');
        }

        Profile::updateOrCreate(
            ['id' => 1],
            [
                'full_name' => $info['name'] ?? 'Muhammad Auwal Abubakar',
                'professional_title' => $info['title'] ?? 'Software Engineer & Solutions Architect',
                'headline' => $info['headline'] ?? 'Building robust, modern software systems and impactful developer communities.',
                'short_bio' => $info['about'] ?? null,
                'location' => $info['location'] ?? 'Nigeria',
                'email' => $info['email'] ?? 'contact.sardaunatech@gmail.com',
                'phone1' => $info['phone1'] ?? null,
                'phone2' => $info['phone2'] ?? null,
                'github_url' => $info['github'] ?? 'https://github.com/Sardaunatechworks',
                'portfolio_url' => $info['portfolio'] ?? 'https://muhammad.sardaunatechlabs.com.ng',
                'profile_image_url' => $avatarUrl,
                'roles' => is_array($info['roles'] ?? null) ? $info['roles'] : ['Software Engineer', 'Full-Stack Developer'],
                'availability_status' => 'Available for selective advisory & contract roles',
            ]
        );

        $this->info('✓ Profile migrated.');
    }

    protected function migrateExperiences(array $experiences): void
    {
        $count = 0;
        foreach ($experiences as $idx => $exp) {
            $descPoints = $exp['desc_points'] ?? [];
            if (is_string($descPoints)) {
                $descPoints = json_decode($descPoints, true) ?: [$descPoints];
            }

            Experience::updateOrCreate(
                ['role_title' => $exp['role'] ?? 'Software Engineer', 'organization' => $exp['company'] ?? 'Technology'],
                [
                    'engagement_type' => 'Full-time',
                    'location' => $exp['location'] ?? 'Remote',
                    'date_display' => $exp['date'] ?? '',
                    'desc_points' => $descPoints,
                    'is_current' => Str::contains(strtolower($exp['date'] ?? ''), 'present'),
                    'sort_order' => $exp['sort_order'] ?? $idx,
                ]
            );
            $count++;
        }

        $this->info("✓ Migrated {$count} experience records.");
    }

    protected function migrateProjects(array $projects, string $supabaseUrl, bool $downloadMedia): void
    {
        $count = 0;
        foreach ($projects as $idx => $proj) {
            $title = $proj['title'] ?? 'Project ' . ($idx + 1);
            $slug = Str::slug($title);

            $imgUrl = $proj['img'] ?? null;
            if ($downloadMedia && $imgUrl && Str::contains($imgUrl, 'supabase.co/storage')) {
                $imgUrl = $this->downloadSupabaseAsset($imgUrl, 'projects');
            }

            $techList = $proj['tech'] ?? [];
            if (is_string($techList)) {
                $techList = json_decode($techList, true) ?: explode(',', $techList);
            }
            $techList = array_map('trim', $techList);

            $project = Project::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $title,
                    'overview' => $proj['desc_text'] ?? $proj['desc'] ?? null,
                    'cover_image' => $imgUrl,
                    'repository_url' => $proj['github'] ?? null,
                    'live_url' => $proj['demo'] ?? null,
                    'category' => 'Engineering',
                    'role' => 'Lead Engineer',
                    'project_status' => in_array('UNDERDEVELOPMENT', $techList) ? 'In Development' : 'Live',
                    'tech_list' => array_values(array_filter($techList, fn($t) => $t !== 'UNDERDEVELOPMENT')),
                    'is_featured' => $idx < 4,
                    'sort_order' => $proj['sort_order'] ?? $idx,
                ]
            );

            // Synchronize normalized technologies
            $techIds = [];
            foreach ($project->tech_list as $tName) {
                if (empty($tName)) continue;
                $tech = Technology::firstOrCreate(['slug' => Str::slug($tName)], ['name' => $tName]);
                $techIds[] = $tech->id;
            }
            $project->technologies()->sync($techIds);

            $count++;
        }

        $this->info("✓ Migrated {$count} project records with normalized technologies.");
    }

    protected function migrateSkills(array $skills): void
    {
        $count = 0;
        foreach ($skills as $idx => $skill) {
            $name = is_string($skill) ? $skill : ($skill['name'] ?? null);
            if (empty($name)) continue;

            Skill::updateOrCreate(
                ['name' => trim($name)],
                [
                    'category' => is_array($skill) ? ($skill['category'] ?? 'Core Technologies') : 'Core Technologies',
                    'sort_order' => is_array($skill) ? ($skill['sort_order'] ?? $idx) : $idx,
                ]
            );
            $count++;
        }

        $this->info("✓ Migrated {$count} skill records.");
    }

    protected function migrateCertifications(array $certs): void
    {
        $count = 0;
        foreach ($certs as $idx => $cert) {
            $name = $cert['title'] ?? $cert['name'] ?? null;
            if (empty($name)) continue;

            Certification::updateOrCreate(
                ['name' => $name, 'issuer' => $cert['issuer'] ?? 'Authority'],
                [
                    'issued_at' => $cert['date'] ?? null,
                    'credential_url' => $cert['credential_url'] ?? null,
                    'badge_image_url' => $cert['badge_image'] ?? null,
                    'sort_order' => $cert['sort_order'] ?? $idx,
                ]
            );
            $count++;
        }

        $this->info("✓ Migrated {$count} certification records.");
    }

    protected function downloadSupabaseAsset(string $url, string $subfolder): string
    {
        try {
            $this->line("   Downloading asset from Supabase Storage: {$url}");
            $res = Http::timeout(20)->get($url);
            if ($res->successful()) {
                $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                $filename = "{$subfolder}/" . Str::random(24) . ".{$extension}";
                Storage::disk('public')->put($filename, $res->body());
                $localUrl = Storage::disk('public')->url($filename);
                $this->line("   ✓ Saved to local storage: {$localUrl}");
                return $localUrl;
            }
        } catch (\Throwable $e) {
            $this->warn("   Failed downloading {$url}: " . $e->getMessage());
        }

        return $url;
    }

    protected function printSummary(): void
    {
        $this->info('');
        $this->info('Migration Database Record Summary:');
        $this->table(
            ['Entity', 'Total Records in MySQL'],
            [
                ['Profiles', Profile::count()],
                ['Experiences', Experience::count()],
                ['Projects', Project::count()],
                ['Technologies', Technology::count()],
                ['Skills', Skill::count()],
                ['Certifications', Certification::count()],
            ]
        );
    }

    protected function getBaselineDataset(): array
    {
        return [
            'personal_info' => [
                [
                    'name' => 'Muhammad Auwal Abubakar',
                    'title' => 'Software Engineer & Solutions Architect',
                    'about' => 'Software Engineer and Technical Solution Architect with a proven track record of architecting scalable web applications, designing enterprise systems, and leading vibrant engineering communities.',
                    'location' => 'Nigeria',
                    'email' => 'contact.sardaunatech@gmail.com',
                    'phone1' => '+234 814 972 5800',
                    'phone2' => '+234 816 718 1904',
                    'github' => 'https://github.com/Sardaunatechworks',
                    'portfolio' => 'https://muhammad.sardaunatechlabs.com.ng',
                    'roles' => ['Software Engineer', 'Full-Stack Developer', 'Community Organizer', 'Technical Architect'],
                ]
            ],
            'experience' => [
                [
                    'role' => 'Lead Software Engineer & Architect',
                    'company' => 'Sardauna Tech Works',
                    'date' => '2022 – Present',
                    'desc_points' => [
                        'Spearheaded enterprise architecture and full-stack development for high-impact web applications.',
                        'Delivered multi-tenant ERP platforms, authenticated dashboards, and high-performance REST APIs.',
                        'Mentored junior engineers and advocated modern engineering best practices.'
                    ]
                ],
                [
                    'role' => 'Community Organizer & Technical Speaker',
                    'company' => 'Google Developer Groups (GDG) & Tech Communities',
                    'date' => '2021 – Present',
                    'desc_points' => [
                        'Organized technical workshops and conferences reaching hundreds of developers across northern Nigeria.',
                        'Delivered keynotes and technical breakout sessions on cloud computing, web performance, and open source.'
                    ]
                ]
            ],
            'projects' => [
                [
                    'title' => 'Trader ERP Enterprise Platform',
                    'desc_text' => 'Comprehensive multi-tenant ERP suite with real-time inventory management, ledger accounting, and order dispatch workflows.',
                    'tech' => ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
                    'github' => 'https://github.com/Sardaunatechworks/tradererpwebapp',
                    'demo' => 'https://tradererpwebapp.vercel.app'
                ],
                [
                    'title' => 'Sardauna Tech Works Portfolio',
                    'desc_text' => 'Editorial personal portfolio and content management portal with high-performance REST API and fine-grained typography.',
                    'tech' => ['React', 'Laravel', 'MySQL', 'Sanctum', 'Vite'],
                    'github' => 'https://github.com/Sardaunatechworks/sardauna-portfolio',
                    'demo' => 'https://muhammad.sardaunatechlabs.com.ng'
                ]
            ],
            'skills' => [
                'PHP / Laravel', 'JavaScript / TypeScript', 'React & Next.js', 'MySQL / PostgreSQL',
                'REST API Architecture', 'Laravel Sanctum Auth', 'System Architecture', 'Git & CI/CD',
                'Tailwind CSS', 'Vite', 'Cloud Deployment & cPanel', 'Performance Optimization'
            ],
            'certifications' => [
                [
                    'title' => 'Full-Stack Software Engineering',
                    'issuer' => 'ALX Africa',
                    'date' => '2023',
                ],
                [
                    'title' => 'Google Cloud Fundamentals',
                    'issuer' => 'Google Cloud Platform',
                    'date' => '2022',
                ]
            ]
        ];
    }
}
