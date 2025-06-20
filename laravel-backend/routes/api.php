<?php

use App\Http\Controllers\Api\UserController ;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello from Laravel API!']);
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);    
Route::delete('/users/{id}', [UserController::class, 'destroy']);
