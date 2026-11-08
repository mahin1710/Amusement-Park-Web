<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\EventInquiry;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function stats(Request $request): JsonResponse
    {
        if (!$request->user()->isStaff()) {
            return response()->json(['message' => 'Unauthorized access.'], 403);
        }

        $totalBookings = Booking::count();
        $confirmedBookings = Booking::where('booking_status', 'CONFIRMED')->count();
        $totalRevenueBDT = Booking::where('payment_status', 'SUCCESS')->sum('final_payable_bdt');
        $totalGuests = Booking::where('booking_status', 'CONFIRMED')
            ->selectRaw('SUM(adult_count + child_count) as total')
            ->value('total') ?? 0;
        $pendingInquiries = EventInquiry::where('status', 'PENDING')->count();
        $unreadMessages = ContactMessage::where('status', 'NEW')->count();

        return response()->json([
            'success' => true,
            'stats' => [
                'totalBookings' => $totalBookings,
                'confirmedBookings' => $confirmedBookings,
                'totalRevenueBDT' => (float) $totalRevenueBDT,
                'totalGuests' => (int) $totalGuests,
                'pendingInquiries' => $pendingInquiries,
                'unreadMessages' => $unreadMessages,
            ],
        ]);
    }

    public function bookings(Request $request): JsonResponse
    {
        if (!$request->user()->isStaff()) {
            return response()->json(['message' => 'Unauthorized access.'], 403);
        }

        $query = Booking::with(['customer', 'package', 'items', 'transactions']);

        if ($status = $request->query('status')) {
            $query->where('booking_status', $status);
        }

        if ($date = $request->query('date')) {
            $query->whereDate('visit_date', $date);
        }

        $bookings = $query->latest()->paginate(20);

        return response()->json([
            'success' => true,
            'data' => BookingResource::collection($bookings),
            'pagination' => [
                'total' => $bookings->total(),
                'perPage' => $bookings->perPage(),
                'currentPage' => $bookings->currentPage(),
                'lastPage' => $bookings->lastPage(),
            ],
        ]);
    }

    public function updateBookingStatus(Request $request, Booking $booking): JsonResponse
    {
        if (!$request->user()->isStaff()) {
            return response()->json(['message' => 'Unauthorized access.'], 403);
        }

        $request->validate([
            'booking_status' => 'required|in:CONFIRMED,RESERVED_PENDING_PAYMENT,CANCELLED,CHECKED_IN,EXPIRED',
        ]);

        $booking->update([
            'booking_status' => $request->booking_status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking status updated successfully.',
            'booking' => new BookingResource($booking->fresh(['customer', 'package', 'items', 'transactions'])),
        ]);
    }

    public function inquiries(Request $request): JsonResponse
    {
        if (!$request->user()->isStaff()) {
            return response()->json(['message' => 'Unauthorized access.'], 403);
        }

        $inquiries = EventInquiry::latest()->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $inquiries->items(),
            'pagination' => [
                'total' => $inquiries->total(),
                'perPage' => $inquiries->perPage(),
                'currentPage' => $inquiries->currentPage(),
                'lastPage' => $inquiries->lastPage(),
            ],
        ]);
    }

    public function contacts(Request $request): JsonResponse
    {
        if (!$request->user()->isStaff()) {
            return response()->json(['message' => 'Unauthorized access.'], 403);
        }

        $messages = ContactMessage::latest()->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $messages->items(),
            'pagination' => [
                'total' => $messages->total(),
                'perPage' => $messages->perPage(),
                'currentPage' => $messages->currentPage(),
                'lastPage' => $messages->lastPage(),
            ],
        ]);
    }
}

