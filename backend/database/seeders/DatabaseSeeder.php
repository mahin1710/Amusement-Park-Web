<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Attraction;
use App\Models\TicketPackage;
use App\Models\TicketAddon;
use App\Models\PromoCode;
use App\Models\GalleryItem;
use App\Models\Faq;
use App\Models\Customer;
use App\Models\Booking;
use App\Models\BookingItem;
use App\Models\PaymentTransaction;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Users
        $admin = User::firstOrCreate(
            ['email' => 'admin@magicisland.com.bd'],
            [
                'name' => 'Magic Island Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        $staff = User::firstOrCreate(
            ['email' => 'staff@magicisland.com.bd'],
            [
                'name' => 'Operations Manager',
                'password' => Hash::make('password123'),
                'role' => 'staff',
            ]
        );

        // 2. Attractions
        $attractions = [
            [
                'slug' => 'tsunami-wave-pool',
                'name_en' => 'Tsunami Bay Giant Wave Pool',
                'name_bn' => 'সুনামি বে বিশাল ওয়েভ পুল',
                'zone' => 'water-park',
                'category' => 'water',
                'thrill_level' => 'Moderate',
                'thrill_level_bn' => 'মাঝারি',
                'height_requirement' => 'All heights (Lifejackets required under 4ft)',
                'height_requirement_bn' => 'সকল উচ্চতার জন্য (৪ ফুটের নিচে লাইফজ্যাকেট বাধ্যতামূলক)',
                'tagline_en' => 'Experience ocean-scale rolling surf in the heart of the park',
                'tagline_bn' => 'পার্কের কেন্দ্রবিন্দুতে সমুদ্রের মতো বিশাল উত্তাল ঢেউয়ের আনন্দ',
                'description_en' => 'Spanning over 25,000 square feet with computerized pneumatic wave generators creating 6 distinct wave patterns up to 6 feet high every 45 minutes.',
                'description_bn' => '২৫,০০০ বর্গফুটের সুবিশাল এলাকা জুড়ে অত্যাধুনিক নিউমেটিক প্রযুক্তি দ্বারা প্রতি ৪৫ মিনিট পরপর তৈরি হয় ৬ ফুট পর্যন্ত উচ্চতার জীবন্ত সামুদ্রিক ঢেউ।',
                'features_en' => ['6 distinct ocean wave modes', 'Gradual beach-style shallow entry', 'White sand lounger deck', 'Certified lifeguard surveillance'],
                'features_bn' => ['৬ ধরনের ভিন্ন ঢেউয়ের প্যাটার্ন', 'সৈকতের মতো ধীরে ধীরে ঢালু অগভীর অংশ', 'হোয়াইট স্যান্ড লাউঞ্জার ডেক', 'সার্বক্ষণিক লাইফগার্ড নিরাপত্তা'],
                'image_url' => 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?q=80&w=1000&auto=format&fit=crop',
                'is_signature' => true,
            ],
            [
                'slug' => 'vortex-tornado-slide',
                'name_en' => 'The Mega Cyclone Vortex',
                'name_bn' => 'মেগা সাইক্লোন ভর্টেক্স স্লাইড',
                'zone' => 'water-park',
                'category' => 'water',
                'thrill_level' => 'Extreme',
                'thrill_level_bn' => 'চরম রোমাঞ্চকর',
                'height_requirement' => 'Minimum 48 inches (122 cm)',
                'height_requirement_bn' => 'ন্যূনতম ৪৮ ইঞ্চি (১২২ সেমি)',
                'tagline_en' => 'A 6-story drop into a zero-gravity funnel tube',
                'tagline_bn' => '৬ তলা উচ্চতা থেকে শূন্য-মাধ্যাকর্ষণ ঘূর্ণি ফানেলে তীব্র পতন',
                'description_en' => 'Riders in 4-person cloverleaf rafts rocket through a 160-foot enclosed tunnel before dropping into a massive 60-foot diameter funnel oscillating back and forth at 45 km/h.',
                'description_bn' => 'চারজনের স্পেশাল র‍্যাফটে ১৬০ ফুটের অন্ধকার পাইপ দিয়ে তীব্র গতিতে নেমে আসুন বিশালাকার ৬০ ফুটের ফানেলে, যেখানে মাধ্যাকর্ষণহীন অনুভূতি সৃষ্টি হয়।',
                'features_en' => ['4-person cloverleaf tube', 'Zero-gravity oscillation', 'High speed 45 km/h entry', 'Water curtain splashdown'],
                'features_bn' => ['৪ জনের ফ্যামিলি টিউব', 'শূন্য-মাধ্যাকর্ষণ দোলনা অনুভূতি', 'ঘন্টায় ৪৫ কিমি গতি', 'ওয়াটার কার্টেন স্প্ল্যাশডাউন'],
                'image_url' => 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop',
                'is_signature' => true,
            ],
            [
                'slug' => 'tropical-lazy-river',
                'name_en' => 'Amazonian Tropical Lazy River',
                'name_bn' => 'আমাজনিয়ান ট্রপিক্যাল লেজি রিভার',
                'zone' => 'water-park',
                'category' => 'family',
                'thrill_level' => 'Mild',
                'thrill_level_bn' => 'সহজ ও মনোরম',
                'height_requirement' => 'All ages welcome',
                'height_requirement_bn' => 'সকল বয়সী অতিথিদের জন্য উন্মুক্ত',
                'tagline_en' => 'Gentle floating cruise through mist caves and tropical palm groves',
                'tagline_bn' => 'কুয়াশাচ্ছন্ন গুহা ও পামবনের ভেতর দিয়ে শান্ত জলপ্রবাহে টিউব ভ্রমণ',
                'description_en' => 'A continuous 450-meter scenic loop meandering under waterfalls, through a glowing crystal cave, and past dinosaur viewing bluffs.',
                'description_bn' => '৪৫০ মিটার দীর্ঘ শান্ত জলের স্রোতধারা, যা ঝর্ণার নিচে ও গহিন গুহার মধ্য দিয়ে ধীরেসুস্থে বয়ে যায়। পুরো পরিবারের জন্য সেরা রিল্যাক্সিং অভিজ্ঞতা।',
                'features_en' => ['450m crystal clear stream', 'Single and double plush tubes', 'Mist cooling stations', 'Gentle 3 km/h current'],
                'features_bn' => ['৪৫০ মিটার স্বচ্ছ জলধারা', 'সিঙ্গেল ও ডাবল আরামদায়ক টিউব', 'কুলিং মিস্ট স্টেশন', 'ধীর ও নিরাপদ স্রোত'],
                'image_url' => 'https://images.unsplash.com/photo-1583344682029-7c87515ecce0?q=80&w=1000&auto=format&fit=crop',
                'is_signature' => false,
            ],
            [
                'slug' => 'jurassic-t-rex-encounter',
                'name_en' => 'Apex Predator: The Colossal T-Rex',
                'name_bn' => 'টি-রেক্স জুরাসিক অ্যানিমেট্রনিক এনকাউন্টার',
                'zone' => 'dino-zone',
                'category' => 'spectacle',
                'thrill_level' => 'Moderate',
                'thrill_level_bn' => 'মাঝারি',
                'height_requirement' => 'All ages welcome',
                'height_requirement_bn' => 'সকল বয়সী দর্শনার্থীদের জন্য উন্মুক্ত',
                'tagline_en' => 'Face-to-face with a 45-foot roaring Tyrannosaurus Rex',
                'tagline_bn' => '৪৫ ফুট লম্বা জীবন্ত গর্জনরত টিরানোসরাস রেক্সের মুখোমুখি',
                'description_en' => 'Engineered with Japanese pneumatic robotics and hyper-realistic silicone skin. Our life-sized T-Rex turns its head, dilates its pupils, and unleashes a bone-vibrating roar heard across the park.',
                'description_bn' => 'জাপানি রোবোটিক্স ও রিয়েলিস্টিক সিলিকন ত্বকে তৈরি ৪৫ ফুটের পূর্ণাকৃতির টি-রেক্স। এর চোখের দৃষ্টি, শ্বাসপ্রশ্বাস ও বুক কাঁপানো গর্জন আপনাকে নিয়ে যাবে প্রাগৈতিহাসিক যুগে।',
                'features_en' => ['45ft life-size scale', 'Computerized audio-animatronics', 'Subwoofer acoustic roaring', 'Authentic Jurassic jungle habitat'],
                'features_bn' => ['৪৫ ফুট পূর্ণাকৃতি বিশালাকার ডাইনোসর', 'কম্পিউটারাইজড নিখুঁত অঙ্গভঙ্গি', 'বুক কাঁপানো হাই-ফাই গর্জন', 'বাস্তবধর্মী ট্রপিক্যাল বন'],
                'image_url' => 'https://images.unsplash.com/photo-1525877442103-5ddb2089e2bb?q=80&w=1000&auto=format&fit=crop',
                'is_signature' => true,
            ],
            [
                'slug' => 'raptor-coaster-chase',
                'name_en' => 'Velociraptor Jungle Sprint Coaster',
                'name_bn' => 'ভেলোসিরাপটর জঙ্গল স্প্রিন্ট কোস্টার',
                'zone' => 'dino-zone',
                'category' => 'thrill',
                'thrill_level' => 'Extreme',
                'thrill_level_bn' => 'চরম রোমাঞ্চকর',
                'height_requirement' => 'Minimum 52 inches (132 cm)',
                'height_requirement_bn' => 'ন্যূনতম ৫২ ইঞ্চি (১৩২ সেমি)',
                'tagline_en' => 'High-speed magnetic launch coaster weaving through raptor nests',
                'tagline_bn' => 'ম্যাগনেটিক হাই-স্পিড লঞ্চ কোস্টারে ক্ষিপ্র গতিতে ডাইনোসরের আস্তানায় ছুটে চলা',
                'description_en' => 'Launches from 0 to 75 km/h in 2.8 seconds, banking through dense Jurassic foliage, heart-stopping near-miss caves, and an inverted zero-G corkscrew.',
                'description_bn' => 'মাত্র ২.৮ সেকেন্ডে ০ থেকে ৭৫ কিমি গতিবেগ তুলে ছুটে যায় ঘন বনাঞ্চল ও খাঁড়া গুহার ভেতর দিয়ে। রয়েছে শূন্য-মাধ্যাকর্ষণ টুইস্ট লুপ।',
                'features_en' => ['0-75 km/h in 2.8s launch', '850m dynamic track', 'Zero-G corkscrew inversion', 'Onboard synchronized soundtrack'],
                'features_bn' => ['২.৮ সেকেন্ডে ৭৫ কিমি গতি', '৮৫০ মিটার রোমাঞ্চকর ট্র্যাক', 'জিরো-জি কর্কস্ক্রু লুপ', 'অনবোর্ড সিনেমাটিক সাউন্ডট্র্যাক'],
                'image_url' => 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1000&auto=format&fit=crop',
                'is_signature' => true,
            ],
            [
                'slug' => 'galaxy-cyclone-rollercoaster',
                'name_en' => 'The Galaxy Cyclone Mega Coaster',
                'name_bn' => 'গ্যালাক্সি সাইক্লোন মেগা রোলারকোস্টার',
                'zone' => 'amusement-park',
                'category' => 'thrill',
                'thrill_level' => 'Extreme',
                'thrill_level_bn' => 'চরম রোমাঞ্চকর',
                'height_requirement' => 'Minimum 54 inches (137 cm)',
                'height_requirement_bn' => 'ন্যূনতম ৫৪ ইঞ্চি (১৩৭ সেমি)',
                'tagline_en' => 'Bangladesh premier steel hypercoaster with a 130ft vertical drop',
                'tagline_bn' => '১৩০ ফুট খাঁড়া পতন ও ৪টি রোমাঞ্চকর লুপসহ মেগা স্টিল কোস্টার',
                'description_en' => 'The crown jewel of Magic Island. Towering 140 feet above the park, boasting 4 inversions, an 85-degree first drop, and speeds reaching 90 km/h with breathtaking skyline views.',
                'description_bn' => 'ম্যাজিক আইল্যান্ডের প্রধান আকর্ষণ। ১৪০ ফুট উঁচু শীর্ষ থেকে ৮৫ ডিগ্রি কোণে খাড়া পতন, ৪টি ইনভার্সন এবং ঘন্টায় ৯০ কিমি গতির রোমাঞ্চকর অভিজ্ঞতা।',
                'features_en' => ['140ft apex summit', '85-degree sheer first drop', '4 breathtaking inversions', 'Magnetic regenerative braking'],
                'features_bn' => ['১৪০ ফুট আকাশছোঁয়া উচ্চতা', '৮৫ ডিগ্রি খাঁড়া ড্রপ', '৪টি পূর্ণাকার ইনভার্সন', 'সর্বাধুনিক ম্যাগনেটিক ব্রেকিং'],
                'image_url' => 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop',
                'is_signature' => true,
            ],
            [
                'slug' => 'grand-skylight-ferris-wheel',
                'name_en' => 'Grand Panoramic Sky Wheel',
                'name_bn' => 'গ্র্যান্ড প্যানোরামিক স্কাই হুইল',
                'zone' => 'amusement-park',
                'category' => 'family',
                'thrill_level' => 'Mild',
                'thrill_level_bn' => 'সহজ ও মনোরম',
                'height_requirement' => 'All heights welcome',
                'height_requirement_bn' => 'সকল উচ্চতার জন্য উন্মুক্ত',
                'tagline_en' => '150-foot giant observation wheel with fully air-conditioned VIP gondolas',
                'tagline_bn' => 'এয়ার-কন্ডিশন্ড ভিআইপি গন্ডোলাসহ ১৫০ ফুট উঁচু প্যানোরামিক স্কাই হুইল',
                'description_en' => 'Rising 150 feet high, 36 enclosed glass capsules offer 360-degree vistas across all 3 theme park zones, lush green river plains, and spectacular sunset horizons.',
                'description_bn' => '১৫০ ফুট উঁচু থেকে ৩৬টি শীতাতপ নিয়ন্ত্রিত কাঁচের ক্যাবিনে বসে পুরো পার্কের ৩টি জোন ও প্রকৃতির দিগন্তজোড়া অপরূপ সূর্যাস্তের ৩৬০ ডিগ্রি দৃশ্য উপভোগ করুন।',
                'features_en' => ['150ft panoramic height', 'Fully air-conditioned luxury capsules', '15-minute scenic rotation', 'Spectacular LED light choreography'],
                'features_bn' => ['১৫০ ফুট উচ্চতার প্যানোরামা', 'এসি গ্লাস কেবিন', '১৫ মিনিটের রিল্যাক্সিং রাইড', 'রাতের চোখ ধাঁধানো এলইডি লাইটিং'],
                'image_url' => 'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?q=80&w=1000&auto=format&fit=crop',
                'is_signature' => true,
            ],
        ];

        foreach ($attractions as $attractionData) {
            Attraction::updateOrCreate(['slug' => $attractionData['slug']], $attractionData);
        }

        // 3. Ticket Packages
        $packages = [
            [
                'package_key' => 'pkg_super_all_access',
                'slug' => 'super-all-access',
                'title_en' => 'Super All-Access Kingdom Pass',
                'title_bn' => 'সুপার অল-অ্যাক্সেস কিংডম পাস',
                'subtitle_en' => 'Unlimited Thrills Across All 3 Epic Zones',
                'subtitle_bn' => 'এক টিকেটে তিনটি জাদুকরী জোনের সম্পূর্ণ প্রবেশাধিকার',
                'description_en' => 'Our flagship ultimate passport providing full-day unlimited access to Water Park, Dino Zone, and Amusement Park rides.',
                'description_bn' => 'ওয়াটার পার্ক, ডাইনো জোন এবং অ্যামিউজমেন্ট পার্কের সকল সাধারণ রাইড সারাদিন সীমাহীন উপভোগ করার প্রিমিয়াম অল-ইন-ওয়ান পাস।',
                'badge_en' => 'Best Value • Ultimate Fun',
                'badge_bn' => 'সেরা পছন্দ • সর্বাপেক্ষা জনপ্রিয়',
                'is_popular' => true,
                'included_zones' => ['water-park', 'dino-zone', 'amusement-park'],
                'adult_price_bdt' => 1850.00,
                'child_price_bdt' => 1250.00,
                'is_placeholder_pricing' => true,
                'perks_en' => [
                    'Full-day unlimited access to all Water Park slides & Wave Pool',
                    'Complete Jurassic Dino Zone trail & animatronic exhibits',
                    'Unlimited turns on classic Amusement Park thrill rides',
                    'Complimentary secure changing room & locker pass access voucher',
                    'Free entry to evening laser light show & musical fountain',
                ],
                'perks_bn' => [
                    'ওয়াটার পার্কের সব স্লাইড ও বিশাল ওয়েভ পুলে সারাদিন সীমাহীন আনন্দ',
                    'জুরাসিক ডাইনো জোনের জীবন্ত গর্জনরত ডাইনোসরদের রোমাঞ্চকর ট্রেইল',
                    'অ্যামিউজমেন্ট পার্কের থ্রিল রোলারকোস্টার ও রাইড আনলিমিটেড উপভোগ',
                    'লকার এবং চেঞ্জিং রুমের বিশেষ অগ্রাধিকার ভাউচার',
                    'সান্ধ্যকালীন চোখ ধাঁধানো লেজার ও মিউজিক্যাল ফাউন্টেন শো',
                ],
                'validity_en' => 'Valid for one single full-day entry during operating hours',
                'validity_bn' => 'পার্কের নির্ধারিত কার্যসময়ে পুরো একদিনের জন্য কার্যকর',
                'availability_status' => 'AVAILABLE',
                'min_guests' => 1,
                'max_guests' => 20,
                'display_order' => 1,
            ],
            [
                'package_key' => 'pkg_water_park_splash',
                'slug' => 'water-park-splash',
                'title_en' => 'Aqua Oasis Water Park Pass',
                'title_bn' => 'অ্যাকোয়া ওয়েসিস ওয়াটার পার্ক পাস',
                'subtitle_en' => 'The Ultimate Tropical Water Paradise',
                'subtitle_bn' => 'গ্রীষ্মের দাবদাহে উত্তাল জলকেলির স্বর্গরাজ্য',
                'description_en' => 'Dedicated full-day access to massive wave pool, high-speed multi-lane slides, lazy river tube cruise, and pirate splash fortress.',
                'description_bn' => 'বিশাল সুনামি ওয়েভ পুল, হাই-স্পিড স্প্ল্যাশ স্লাইড, লেজি রিভার টিউব ক্রুজ এবং শিশুদের পাইরেট ওয়াটার ক্যাসেলের বিশেষ পাস।',
                'badge_en' => 'Water Lovers Choice',
                'badge_bn' => 'ওয়াটার লাভার্স স্পেশাল',
                'is_popular' => false,
                'included_zones' => ['water-park'],
                'adult_price_bdt' => 1200.00,
                'child_price_bdt' => 850.00,
                'is_placeholder_pricing' => true,
                'perks_en' => [
                    'Full access to 12+ signature water slides & drop flumes',
                    'Ocean-scale artificial wave pool sessions every 45 minutes',
                    'Gentle 400m Lazy River tropical tube safari',
                    'Kids Pirate Splash lagoon with interactive water cannons',
                    'Complimentary shower & changing amenities',
                ],
                'perks_bn' => [
                    '১২+ সিগনেচার ওয়াটার স্লাইড এবং এক্সট্রিম ড্রপ স্লিপ',
                    'প্রতি ৪৫ মিনিট অন্তর সমুদ্রের মতো কৃত্রিম ঢেউয়ের পুল সেশন',
                    '৪০০ মিটার শান্ত লেজি রিভার ট্রপিক্যাল ফ্লোট সাফারি',
                    'শিশুদের বিশেষ ইন্টারঅ্যাক্টিভ ওয়াটার কামান ও স্প্ল্যাশ লাগুন',
                    'শাওয়ার ও ফ্রেশ হওয়ার সুব্যবস্থা',
                ],
                'validity_en' => 'Valid for single full-day entry to Water Park zone',
                'validity_bn' => 'শুধুমাত্র ওয়াটার পার্ক জোনের জন্য একদিন কার্যকর',
                'availability_status' => 'AVAILABLE',
                'min_guests' => 1,
                'max_guests' => 20,
                'display_order' => 2,
            ],
            [
                'package_key' => 'pkg_dino_amusement_combo',
                'slug' => 'dino-amusement-combo',
                'title_en' => 'Jurassic Thrills & Rides Pass',
                'title_bn' => 'জুরাসিক থ্রিলস ও রাইডস কম্বো',
                'subtitle_en' => 'Dino Zone + Amusement Park Land Adventure',
                'subtitle_bn' => 'ডাইনোসর ও আধুনিক রোলারকোস্টারের যুগল রোমাঞ্চ',
                'description_en' => 'Perfect for guests seeking pure land-based excitement: explore roaring prehistoric beasts and thrill-filled dry rides.',
                'description_bn' => 'যারা শুষ্ক জমিনের আনন্দ ও রোমাঞ্চ চান: বিশালাকার প্রাগৈতিহাসিক ডাইনোসর ও আধুনিক মেগা রাইডসের দারুণ কম্বো।',
                'badge_en' => 'Dry Land Adventure',
                'badge_bn' => 'ল্যান্ড অ্যাডভেঞ্চার',
                'is_popular' => false,
                'included_zones' => ['dino-zone', 'amusement-park'],
                'adult_price_bdt' => 1350.00,
                'child_price_bdt' => 950.00,
                'is_placeholder_pricing' => true,
                'perks_en' => [
                    'Full entry to prehistoric animatronic Jurassic Dino Trail',
                    'Unlimited rides on Galaxy Cyclone Coaster & Sky Ferris Wheel',
                    'Dino Fossil Excavation sand lab experience for children',
                    'Bumper cars, carousel & carnival family rides',
                    '4D Prehistoric Encounter motion cinema entry ticket',
                ],
                'perks_bn' => [
                    'প্রাগৈতিহাসিক অ্যানিমেট্রনিক জুরাসিক ডাইনো ট্রেইলে প্রবেশ',
                    'গ্যালাক্সি সাইক্লোন কোস্টার ও সুবিশাল স্কাই হুইল সীমাহীন চড়া',
                    'শিশুদের জন্য ডাইনো ফসিল খনন ল্যাব ও বিশেষ অ্যাক্টিভিটি',
                    'বাম্পার কার, ক্যারোজেল এবং পারিবারিক আনন্দদায়ক রাইডসমূহ',
                    '৪-ডি প্রাগৈতিহাসিক মোশন সিনেমা হলের বিশেষ টিকেট',
                ],
                'validity_en' => 'Valid for single full-day entry to Dino Zone and Amusement Park',
                'validity_bn' => 'ডাইনো জোন ও অ্যামিউজমেন্ট পার্ক জোনের জন্য সারাদিন কার্যকর',
                'availability_status' => 'AVAILABLE',
                'min_guests' => 1,
                'max_guests' => 20,
                'display_order' => 3,
            ],
            [
                'package_key' => 'pkg_vip_express',
                'slug' => 'vip-express',
                'title_en' => 'VIP Royal Fast-Track Pass',
                'title_bn' => 'ভিআইপি রয়েল ফাস্ট-ট্র্যাক পাস',
                'subtitle_en' => 'Zero Queues • Priority Access • VIP Lounge',
                'subtitle_bn' => 'লাইনবিহীন এক্সপ্রেস প্রবেশ • ভিআইপি লাউঞ্জ সুবিধা',
                'description_en' => 'The ultimate luxury amusement park experience. Skip the queues with dedicated fast-track lane entry across all major rides.',
                'description_bn' => 'সেরা আভিজাত্যময় অভিজ্ঞতা — কোনো লাইনে দাঁড়ানো ছাড়াই দ্রুত রাইডে ওঠা, এয়ার-কন্ডিশন্ড ভিআইপি লাউঞ্জ ও প্রিমিয়াম হসপিটালিটি।',
                'badge_en' => 'VIP Exclusive • Zero Queue',
                'badge_bn' => 'ভিআইপি প্রিমিয়াম • নো-ওয়েটিং',
                'is_popular' => false,
                'included_zones' => ['water-park', 'dino-zone', 'amusement-park'],
                'adult_price_bdt' => 3200.00,
                'child_price_bdt' => 2400.00,
                'is_placeholder_pricing' => true,
                'perks_en' => [
                    'Unlimited Fast-Track lane access on all rides (Zero waiting)',
                    'Access to air-conditioned Royal VIP Lounge with refreshments',
                    'Dedicated personal park host/concierge assistance',
                    'Reserved premium seating for all stunt shows & spectacles',
                    'Complimentary secure private cabana locker and beach towel kit',
                ],
                'perks_bn' => [
                    'সব রাইডে আনলিমিটেড ফাস্ট-ট্র্যাক এক্সপ্রেস লেইন (লাইনের ঝামেলাহীন)',
                    'শীতাতপ নিয়ন্ত্রিত রয়েল ভিআইপি লাউঞ্জে প্রবেশ ও ফ্রি স্ন্যাকস',
                    'ব্যক্তিগত গাইড ও কনসিয়ার্জ সহায়তা',
                    'স্টান্ট শো ও স্টেজ পারফরম্যান্সে সংরক্ষিত ফ্রন্ট-রো আসন',
                    'প্রিমিয়াম প্রাইভেট ক্যাবানা, লকার ও টাওয়েল কমপ্লিমেন্টারি কিট',
                ],
                'validity_en' => 'Valid for single full-day VIP all-zone entry',
                'validity_bn' => 'সারাদিনের সকল জোনের ভিআইপি ফাস্ট-ট্র্যাক প্রবেশাধিকার',
                'availability_status' => 'LIMITED',
                'min_guests' => 1,
                'max_guests' => 10,
                'display_order' => 4,
            ],
        ];

        foreach ($packages as $pkgData) {
            TicketPackage::updateOrCreate(['package_key' => $pkgData['package_key']], $pkgData);
        }

        // 4. Ticket Addons
        $addons = [
            [
                'addon_key' => 'addon_locker',
                'name_en' => 'Digital Smart Locker (Full Day)',
                'name_bn' => 'ডিজিটাল স্মার্ট লকার (সারাদিন)',
                'description_en' => 'RFID wristband accessible secure waterproof locker in Water Park area.',
                'description_bn' => 'আরএফআইডি রিস্টব্যান্ড চালিত সুরক্ষিত ওয়াটারপ্রুফ ব্যক্তিগত লকার।',
                'price_bdt' => 150.00,
                'per_person' => false,
                'category' => 'facility',
            ],
            [
                'addon_key' => 'addon_buffet_lunch',
                'name_en' => 'Island Oasis Grand Lunch Buffet',
                'name_bn' => 'আইল্যান্ড ওয়েসিস গ্র্যান্ড লাঞ্চ বুফে',
                'description_en' => "Unlimited 45+ item chef's special buffet with soft beverages at Lagoon Restaurant.",
                'description_bn' => 'লাগুন রেস্তোরাঁয় ৪৫+ পদের মনমাতানো সুস্বাদু শেফস বুফে লাঞ্চ ও বেভারেজ।',
                'price_bdt' => 650.00,
                'per_person' => true,
                'category' => 'food',
            ],
            [
                'addon_key' => 'addon_dino_safari_photo',
                'name_en' => 'Prehistoric Dino Encounter Photo Pass',
                'name_bn' => 'জুরাসিক ডাইনো ফ্যামিলি ফটো সেশন',
                'description_en' => 'Professional high-definition photo print + instant digital download with T-Rex.',
                'description_bn' => 'টি-রেক্সের সাথে প্রফেশনাল এইচডি প্রিন্ট ছবি ও ইনস্ট্যান্ট ডিজিটাল ডাউনলোড কপি।',
                'price_bdt' => 250.00,
                'per_person' => false,
                'category' => 'activity',
            ],
            [
                'addon_key' => 'addon_tube_rental',
                'name_en' => 'Twin Rider Wave Pool Float Tube',
                'name_bn' => 'টুইন ওয়েভ পুল ফ্লোট টিউব',
                'description_en' => 'Dual-handle durable floatation ring for supreme comfort in the giant wave pool.',
                'description_bn' => 'বিশাল ওয়েভ পুলে ভেসে থাকার প্রিমিয়াম আরামদায়ক ডাবল ফ্লোট টিউব।',
                'price_bdt' => 100.00,
                'per_person' => false,
                'category' => 'facility',
            ],
        ];

        foreach ($addons as $addonData) {
            TicketAddon::updateOrCreate(['addon_key' => $addonData['addon_key']], $addonData);
        }

        // 5. Promo Codes
        $promos = [
            [
                'code' => 'MAGICOPEN',
                'discount_percentage' => 10.00,
                'max_discount_bdt' => 500.00,
                'description_en' => 'Special 10% Welcome Preview Discount',
                'description_bn' => 'বিশেষ ১০% প্রিভিউ স্বাগতম ছাড়',
                'valid_until' => '2026-12-31',
                'is_active' => true,
            ],
            [
                'code' => 'FAMILYFUN',
                'discount_percentage' => 15.00,
                'max_discount_bdt' => 1000.00,
                'description_en' => '15% Family & Group Celebrations Discount (Min 4 guests)',
                'description_bn' => '১৫% ফ্যামিলি ও গ্রুপ সেলিব্রেশন ছাড় (ন্যূনতম ৪ জন)',
                'valid_until' => '2026-12-31',
                'is_active' => true,
            ],
        ];

        foreach ($promos as $promoData) {
            PromoCode::updateOrCreate(['code' => $promoData['code']], $promoData);
        }

        // 6. Gallery Items
        $gallery = [
            [
                'category' => 'water',
                'title_en' => 'Tsunami Bay Surge Session',
                'title_bn' => 'সুনামি বে ঢেউয়ের উচ্ছ্বাস',
                'caption_en' => 'Guests riding 6-foot rolling ocean waves at the computerized wave pool.',
                'caption_bn' => 'বিশাল কৃত্রিম ওয়েভ পুলে দর্শনার্থীদের অনাবিল আনন্দের মুহূর্ত।',
                'image_url' => 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?q=80&w=1200&auto=format&fit=crop',
                'display_order' => 1,
            ],
            [
                'category' => 'dino',
                'title_en' => 'The 45-Foot Roaring T-Rex',
                'title_bn' => '৪৫ ফুটের গর্জনরত টি-রেক্স',
                'caption_en' => 'Encountering the robotic apex predator deep within the Jurassic Trail.',
                'caption_bn' => 'জুরাসিক ট্রেইলের গহিনে জীবন্ত গর্জনরত প্রাগৈতিহাসিক টিরানোসরাস রেক্স।',
                'image_url' => 'https://images.unsplash.com/photo-1525877442103-5ddb2089e2bb?q=80&w=1200&auto=format&fit=crop',
                'display_order' => 2,
            ],
            [
                'category' => 'amusement',
                'title_en' => 'Galaxy Cyclone Inverted Corkscrew',
                'title_bn' => 'গ্যালাক্সি সাইক্লোন কর্কস্ক্রু লুপ',
                'caption_en' => 'Riders experiencing negative G-forces along the 140ft steel mega coaster.',
                'caption_bn' => '১৪০ ফুট উচ্চতার মেগা কোস্টারে মাধ্যাকর্ষণহীন রোমাঞ্চের মুহূর্ত।',
                'image_url' => 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
                'display_order' => 3,
            ],
            [
                'category' => 'water',
                'title_en' => 'Mega Vortex Funnel Splash',
                'title_bn' => 'মেগা ভর্টেক্স ফানেল স্প্ল্যাশ',
                'caption_en' => 'Four-person family rafts dropping from the 6-story enclosed tower.',
                'caption_bn' => '৬ তলা উচ্চতার অন্ধকার পাইপ থেকে ফানেলে দ্রুতগতির ওয়াটার ড্রপ।',
                'image_url' => 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop',
                'display_order' => 4,
            ],
            [
                'category' => 'amusement',
                'title_en' => '150ft Sky Wheel Sunset Vista',
                'title_bn' => '১৫০ ফুট স্কাই হুইল সূর্যাস্ত প্যানোরামা',
                'caption_en' => '360-degree panoramic skyline views from the VIP air-conditioned gondolas.',
                'caption_bn' => 'শীতাতপ নিয়ন্ত্রিত গ্লাস কেবিন থেকে সূর্যাস্তের দিগন্তজোড়া অপরূপ দৃশ্য।',
                'image_url' => 'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?q=80&w=1200&auto=format&fit=crop',
                'display_order' => 5,
            ],
            [
                'category' => 'night',
                'title_en' => 'Grand Lakeside Laser & Fountain Spectacle',
                'title_bn' => 'লেকের পানিতে লেজার ও মিউজিক্যাল ফোয়ারা',
                'caption_en' => 'Synchronized aquatic illumination and fireworks lighting up the evening sky.',
                'caption_bn' => 'সন্ধ্যায় চোখ ধাঁধানো রঙিন লাইটিং, ফোয়ারা নৃত্য ও সঙ্গীতের মোহনীয় আবহ।',
                'image_url' => 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1200&auto=format&fit=crop',
                'display_order' => 6,
            ],
        ];

        foreach ($gallery as $gItem) {
            GalleryItem::updateOrCreate(['title_en' => $gItem['title_en']], $gItem);
        }

        // 7. FAQs
        $faqs = [
            [
                'category' => 'ticketing',
                'question_en' => 'How are child tickets calculated?',
                'question_bn' => 'শিশুদের টিকেটের মাপকাঠি কীভাবে নির্ধারিত হয়?',
                'answer_en' => 'Children under 3 feet in height (or below 3 years of age) enjoy free entry when accompanied by a ticketed adult guardian. Children above 3 feet enter under the discounted child tariff.',
                'answer_bn' => '৩ ফুটের নিচে উচ্চতার (অথবা ৩ বছরের কম বয়সী) শিশুরা টিকেটধারী অভিভাবকের সাথে বিনামূল্যে প্রবেশ করতে পারবে। ৩ ফুটের বেশি উচ্চতার শিশুদের জন্য নির্ধারিত শিশু টিকেট প্রয়োজন।',
                'display_order' => 1,
            ],
            [
                'category' => 'ticketing',
                'question_en' => 'Can I upgrade my pass inside the park?',
                'question_bn' => 'পার্কে প্রবেশের পর কি পাস আপগ্রেড করা সম্ভব?',
                'answer_en' => 'Yes! Single-zone ticket holders can easily upgrade to the Super All-Access Pass at any of our Guest Services kiosks inside the park.',
                'answer_bn' => 'হ্যাঁ! একক জোনের টিকেটধারীরা পার্কের ভেতরের যেকোনো গেস্ট সার্ভিস কিয়স্কে গিয়ে সামান্য পার্থক্য পরিশোধ করে সুপার অল-অ্যাক্সেস পাসে আপগ্রেড করতে পারবেন।',
                'display_order' => 2,
            ],
            [
                'category' => 'safety',
                'question_en' => 'What is the policy for inclement weather or heavy rain?',
                'question_bn' => 'প্রচণ্ড বৃষ্টি বা বিরূপ আবহাওয়ায় পার্কের নিয়ম কী?',
                'answer_en' => 'The Water Park remains delightfully open during warm light showers! In the event of severe lightning storms, high-speed outdoor coasters pause temporarily for guest safety and resume immediately once cleared.',
                'answer_bn' => 'হালকা বৃষ্টিতে ওয়াটার পার্ক সবসময় খোলা থাকে এবং চমৎকার অনুভূতি দেয়! বজ্রঝড়ের ক্ষেত্রে কেবল উন্মুক্ত মেগা রোলারকোস্টার সাময়িকভাবে বন্ধ রাখা হয় এবং আবহাওয়া স্বাভাবিক হলে পুনরায় চালু হয়।',
                'display_order' => 3,
            ],
        ];

        foreach ($faqs as $faqData) {
            Faq::updateOrCreate(['question_en' => $faqData['question_en']], $faqData);
        }

        // 8. Sample Demo Booking
        $demoCustomer = Customer::firstOrCreate(
            ['phone' => '01700000000'],
            [
                'full_name' => 'Demo Guest',
                'email' => 'guest@example.com',
                'address' => 'Dhaka, Bangladesh',
            ]
        );

        $superPkg = TicketPackage::where('package_key', 'pkg_super_all_access')->first();

        $demoBooking = Booking::updateOrCreate(
            ['booking_reference' => 'MI-DEMO-2026'],
            [
                'customer_id' => $demoCustomer->id,
                'ticket_package_id' => $superPkg->id,
                'visit_date' => '2026-12-25',
                'adult_count' => 2,
                'child_count' => 1,
                'package_price_adult' => 1850.00,
                'package_price_child' => 1250.00,
                'package_subtotal' => 4950.00,
                'addons_total' => 150.00,
                'applied_promo_code' => 'MAGICOPEN',
                'discount_amount' => 500.00,
                'vat_percentage' => 5.00,
                'vat_amount' => 230.00,
                'final_payable_bdt' => 4830.00,
                'booking_status' => 'CONFIRMED',
                'payment_method' => 'sslcommerz',
                'payment_status' => 'SUCCESS',
                'ticket_qr_payload' => json_encode(['ref' => 'MI-DEMO-2026', 'guests' => 3, 'date' => '2026-12-25']),
                'special_requests' => 'Window seat reservation for lunch buffet',
            ]
        );

        $lockerAddon = TicketAddon::where('addon_key', 'addon_locker')->first();

        BookingItem::firstOrCreate(
            ['booking_id' => $demoBooking->id, 'item_type' => 'package_adult'],
            [
                'name_en' => 'Super All-Access Kingdom Pass (Adult)',
                'name_bn' => 'সুপার অল-অ্যাক্সেস কিংডম পাস (প্রাপ্তবয়স্ক)',
                'quantity' => 2,
                'unit_price_bdt' => 1850.00,
                'total_price_bdt' => 3700.00,
            ]
        );

        BookingItem::firstOrCreate(
            ['booking_id' => $demoBooking->id, 'item_type' => 'addon'],
            [
                'ticket_addon_id' => $lockerAddon?->id,
                'name_en' => 'Digital Smart Locker (Full Day)',
                'name_bn' => 'ডিজিটাল স্মার্ট লকার (সারাদিন)',
                'quantity' => 1,
                'unit_price_bdt' => 150.00,
                'total_price_bdt' => 150.00,
            ]
        );

        PaymentTransaction::firstOrCreate(
            ['transaction_reference' => 'TXN_DEMO_SSL_987654'],
            [
                'booking_id' => $demoBooking->id,
                'gateway' => 'sslcommerz',
                'status' => 'SUCCESS',
                'amount_bdt' => 4830.00,
                'currency' => 'BDT',
                'gateway_transaction_ref' => 'SSL_DEMO_VAL_ID',
                'paid_at' => now(),
            ]
        );
    }
}
