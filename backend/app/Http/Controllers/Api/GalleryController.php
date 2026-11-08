<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = GalleryItem::where('is_active', true);

        if ($category = $request->query('category')) {
            if ($category !== 'all') {
                $query->where('category', $category);
            }
        }

        $items = $query->orderBy('display_order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $items->map(function ($item) {
                return [
                    'id' => (string) $item->id,
                    'category' => $item->category,
                    'titleEn' => $item->title_en,
                    'titleBn' => $item->title_bn,
                    'captionEn' => $item->caption_en,
                    'captionBn' => $item->caption_bn,
                    'imageUrl' => $item->image_url,
                ];
            }),
        ]);
    }
}

