<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Faq::where('is_active', true);

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        $faqs = $query->orderBy('display_order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $faqs->map(function ($f) {
                return [
                    'id' => $f->id,
                    'category' => $f->category,
                    'qEn' => $f->question_en,
                    'qBn' => $f->question_bn,
                    'aEn' => $f->answer_en,
                    'aBn' => $f->answer_bn,
                ];
            }),
        ]);
    }
}

