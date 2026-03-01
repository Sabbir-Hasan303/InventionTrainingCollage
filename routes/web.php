<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return Inertia::render('Web/Home');
});

Route::get('/about', function () {
    return Inertia::render('Web/About');
});

Route::get('/plots', function () {
    return Inertia::render('Web/Plots');
});

Route::get('/gallery', function () {
    return Inertia::render('Web/Gallery');
});

Route::get('/pricing', function () {
    return Inertia::render('Web/Pricing');
});

Route::get('/projects', function () {
    return Inertia::render('Web/Projects');
});

Route::get('/projects/{slug}', function (string $slug) {
    return Inertia::render('Web/ProjectDetails', [
        'slug' => $slug,
    ]);
});

Route::get('/contact', function () {
    return Inertia::render('Web/Contact');
});

Route::get('/landowner', function () {
    return Inertia::render('Web/Landowner');
});

Route::get('/animation', function () {
    return Inertia::render('Web/Animation');
});

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
