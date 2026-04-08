<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Web\StudentFormsController;

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

Route::get('/courses', function () {
    return Inertia::render('Web/Courses');
});

Route::get('/courses/{slug}', function (string $slug) {
    return Inertia::render('Web/CourseDetails', [
        'slug' => $slug,
    ]);
});

Route::get('/course/{id}', function (string $id) {
    return Inertia::render('Web/CourseDetails', [
        'legacyId' => $id,
    ]);
});

Route::get('/category/{category}', function (string $category) {
    return Inertia::render('Web/Courses', [
        'category' => $category,
    ]);
});

Route::get('/current-students', function () {
    return Inertia::render('Web/Current-Students');
});
Route::post('/current-students/support', [StudentFormsController::class, 'submitSupport'])->name('web.current-students.support');
Route::post('/current-students/feedback', [StudentFormsController::class, 'submitFeedback'])->name('web.current-students.feedback');

Route::get('/enroll', function () {
    return Inertia::render('Web/Enroll');
});
Route::post('/enroll', [StudentFormsController::class, 'submitEnroll'])->name('web.enroll.submit');

Route::get('/contact', function () {
    return Inertia::render('Web/Contact');
});
Route::post('/contact/enquiry', [StudentFormsController::class, 'submitEnquiry'])->name('web.contact.enquiry');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';


