<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminEmail = env('ADMIN_EMAIL', 'contact.sardaunatech@gmail.com');
        $adminPassword = env('ADMIN_INITIAL_PASSWORD', 'SardaunaTech@2026!');

        User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'Muhammad Auwal Abubakar',
                'password' => Hash::make($adminPassword),
                'email_verified_at' => now(),
            ]
        );
    }
}
