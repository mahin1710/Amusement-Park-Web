<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AttractionController;
use App\Http\Controllers\Api\TicketPackageController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\EventInquiryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\AdminDashboardController;

/*
|--------------------------------------------------------------------------
| API Routes for Magic Island Amusement Park
|--------------------------------------------------------------------------
*/

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'service' => 'Magic Island API',
        'version' => '1.0.0',
        'timestamp' => now()->toISOString(),
    ]);
});

// Helper route group macro or repeated for both root and versioned routes
$defineApiRoutes = function () {
    // Attractions & Rides
    Route::get('/attractions', [AttractionController::class, 'index']);
    Route::get('/attractions/{slug}', [AttractionController::class, 'show']);

    // Ticket Packages & Calculation
    Route::get('/packages', [TicketPackageController::class, 'index']);
    Route::post('/packages/calculate', [TicketPackageController::class, 'calculate']);

    // Bookings
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/search', [BookingController::class, 'search']);
    Route::get('/bookings/{reference}', [BookingController::class, 'show']);

    // Payments
    Route::post('/payment/initiate', [PaymentController::class, 'initiate']);
    Route::post('/payment/callback', [PaymentController::class, 'callback']);

    // Public Content
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::get('/faqs', [FaqController::class, 'index']);
    Route::post('/events/inquiry', [EventInquiryController::class, 'store']);
    Route::post('/contact', [ContactController::class, 'store']);

    // Auth
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Admin Management
        Route::prefix('admin')->group(function () {
            Route::get('/stats', [AdminDashboardController::class, 'stats']);
            Route::get('/bookings', [AdminDashboardController::class, 'bookings']);
            Route::patch('/bookings/{booking}/status', [AdminDashboardController::class, 'updateBookingStatus']);
            Route::get('/inquiries', [AdminDashboardController::class, 'inquiries']);
            Route::get('/contacts', [AdminDashboardController::class, 'contacts']);
        });
    });
};

// Mount under both root (/api/...) and /api/v1/...
$defineApiRoutes();

Route::prefix('v1')->group(function () use ($defineApiRoutes) {
    $defineApiRoutes();
});
