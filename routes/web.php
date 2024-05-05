<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);
Route::post('/profile', [UserController::class, 'profile']);

Route::get('/chat_confirm/{room}', [ChatController::class, 'chat_confirm']);
Route::get('/chat/{room}', [ChatController::class, 'chat']);
Route::post('/chat/{room}/send', [ChatController::class, 'sendMessage']);

Route::get('/403', function() {
    return view('403');
});

