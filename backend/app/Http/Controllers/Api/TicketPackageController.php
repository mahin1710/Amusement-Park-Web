<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TicketPackageResource;
use App\Http\Resources\TicketAddonResource;
use App\Models\TicketPackage;
use App\Models\TicketAddon;
use App\Models\PromoCode;
use App\Services\PricingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TicketPackageController extends Controller
{
    public function __construct(
        protected PricingService $pricingService
    ) {}

    public function index(): JsonResponse
    {
        $packages = TicketPackage::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->get();

        $addons = TicketAddon::where('is_active', true)->get();

        return response()->json([
            'success' => true,
            'packages' => TicketPackageResource::collection($packages),
            'addons' => TicketAddonResource::collection($addons),
            'disclaimer' => [
                'en' => 'Preview Pricing Notice: Rates shown are preliminary architectural placeholders. Final verified tariff cards and early-bird rates will be formally published prior to commercial park inauguration.',
                'bn' => 'মূল্য সংক্রান্ত বিজ্ঞপ্তি: প্রদর্শিত টিকেটের মূল্য ডেমো/খসড়া কাঠামোভিত্তিক। পার্ক উদ্বোধনের পূর্বে চূড়ান্ত অফিসিয়াল মূল্যতালিকা ও আর্লি-বার্ড অফার যথানিয়মে প্রকাশ করা হবে।',
            ],
        ]);
    }

    public function calculate(Request $request): JsonResponse
    {
        $packageId = $request->input('package_id');
        $adults = (int) $request->input('adults', 1);
        $children = (int) $request->input('children', 0);
        $addonIds = (array) $request->input('addon_ids', []);
        $promoCode = $request->input('promo_code');

        $package = TicketPackage::where('id', $packageId)
            ->orWhere('package_key', $packageId)
            ->first();

        if (!$package) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid package identifier',
            ], 404);
        }

        $breakdown = $this->pricingService->calculate(
            $package,
            $adults,
            $children,
            $addonIds,
            $promoCode
        );

        return response()->json([
            'success' => true,
            'pricing' => $breakdown,
        ]);
    }
}

