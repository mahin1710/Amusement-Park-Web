<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    /**
     * Determine whether the user can view any bookings.
     */
    public function viewAny(User $user): bool
    {
        return $user->isStaff();
    }

    /**
     * Determine whether the user can view the booking.
     */
    public function view(User $user, Booking $booking): bool
    {
        if ($user->isStaff()) {
            return true;
        }

        return $booking->customer && $booking->customer->user_id === $user->id;
    }

    /**
     * Determine whether the user can update the booking status.
     */
    public function update(User $user, Booking $booking): bool
    {
        return $user->isStaff();
    }

    /**
     * Determine whether the user can delete the booking.
     */
    public function delete(User $user, Booking $booking): bool
    {
        return $user->isAdmin();
    }
}

