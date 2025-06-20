<?php

use App\Http\Controllers\Api\UserController ;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello from Laravel API!']);
});

Route::get('/users', [UserController::class, 'index']); // <--- ✅ nouvelle route index
Route::post('/users', [UserController::class, 'store']);
