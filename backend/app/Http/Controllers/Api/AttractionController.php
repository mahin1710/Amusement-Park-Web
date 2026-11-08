<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttractionResource;
use App\Models\Attraction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AttractionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Attraction::where('is_active', true);

        if ($zone = $request->query('zone')) {
            if ($zone !== 'all') {
                $query->where('zone', $zone);
            }
        }

        if ($thrill = $request->query('thrill')) {
            if ($thrill !== 'all') {
                $query->where('thrill_level', 'ILIKE', $thrill)
                      ->orWhere('thrill_level', 'LIKE', $thrill);
            }
        }

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name_en', 'LIKE', "%{$search}%")
                  ->orWhere('name_bn', 'LIKE', "%{$search}%")
                  ->orWhere('description_en', 'LIKE', "%{$search}%")
                  ->orWhere('description_bn', 'LIKE', "%{$search}%");
            });
        }

        $attractions = $query->orderBy('is_signature', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => AttractionResource::collection($attractions),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $attraction = Attraction::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$attraction) {
            return response()->json([
                'success' => false,
                'error' => 'Attraction not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new AttractionResource($attraction),
        ]);
    }
}

