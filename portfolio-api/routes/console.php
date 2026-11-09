<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('portfolio:inspire', function () {
    $this->comment('Crafting exceptional digital systems for Muhammad Auwal Abubakar.');
})->purpose('Display portfolio engineering motto');
