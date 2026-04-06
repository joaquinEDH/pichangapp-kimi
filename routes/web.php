<?php

use App\Http\Controllers\DiscoverController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\MatchRequestController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return inertia('Dashboard');
    })->name('dashboard');

    Route::get('/discover', [DiscoverController::class, 'index'])->name('discover.index');
    Route::get('/discover/swipe', [DiscoverController::class, 'swipe'])->name('discover.swipe');

    Route::resource('teams', TeamController::class)->parameters([
        'teams' => 'team:slug'
    ]);
    Route::post('/teams/{team:slug}/toggle-looking', [TeamController::class, 'toggleLookingForMatch'])
        ->name('teams.toggle-looking');

    Route::get('/match-requests', [MatchRequestController::class, 'index'])->name('match-requests.index');
    Route::get('/match-requests/create/{team:slug}', [MatchRequestController::class, 'create'])->name('match-requests.create');
    Route::post('/match-requests', [MatchRequestController::class, 'store'])->name('match-requests.store');
    Route::post('/match-requests/{id}/accept', [MatchRequestController::class, 'accept'])->name('match-requests.accept');
    Route::post('/match-requests/{id}/reject', [MatchRequestController::class, 'reject'])->name('match-requests.reject');

    Route::get('/matches', [MatchController::class, 'index'])->name('matches.index');
    Route::get('/matches/{id}', [MatchController::class, 'show'])->name('matches.show');
    Route::post('/matches/{id}/score', [MatchController::class, 'updateScore'])->name('matches.score');
});

require __DIR__ . '/auth.php';
