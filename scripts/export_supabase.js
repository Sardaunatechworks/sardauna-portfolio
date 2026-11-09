/**
 * Supabase Migration Exporter Tool
 * Muhammad Auwal Abubakar Personal Portfolio Rebuild
 * 
 * Exports all data from Supabase tables into portfolio-api/storage/app/supabase_export.json
 * for automated ingestion into Laravel MySQL database.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Supabase credentials not found in environment.');
    console.error('Usage: VITE_SUPABASE_URL=... VITE_SUPABASE_ANON_KEY=... node scripts/export_supabase.js');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TABLES = ['personal_info', 'experience', 'projects', 'skills', 'certifications'];

async function runExport() {
    console.log(`[Supabase Exporter] Connecting to: ${supabaseUrl}`);
    const exportData = {
        exported_at: new Date().toISOString(),
        tables: {}
    };

    for (const table of TABLES) {
        console.log(`[Supabase Exporter] Fetching table: ${table}...`);
        const { data, error } = await supabase.from(table).select('*');
        if (error) {
            console.warn(`[Supabase Exporter] Warning: Failed to fetch ${table}:`, error.message);
            exportData.tables[table] = [];
            exportData[table] = [];
        } else {
            console.log(`[Supabase Exporter] Retrieved ${data?.length || 0} rows from ${table}`);
            exportData.tables[table] = data || [];
            exportData[table] = data || [];
        }
    }

    const outputDir = path.resolve(__dirname, '../portfolio-api/storage/app');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'supabase_export.json');
    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf-8');

    console.log(`[Supabase Exporter] ✓ Successfully exported data to: ${outputPath}`);
}

runExport().catch(err => {
    console.error('[Supabase Exporter] Fatal error during export:', err);
    process.exit(1);
});
