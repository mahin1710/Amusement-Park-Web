/**
 * Centralized Room Pricing & Stay Configuration
 *
 * Requirements:
 * - Deluxe Pool-View Room: ৳6,500 per room per day
 * - Executive Family Suite: ৳8,000 per suite per day
 * - VIP Presidential Resort Villa: ৳9,500 per villa per day
 * - Standard stay: Check-in 10:00 AM to next day 09:30 AM = 1 day (23.5 hours)
 * - Chargeable days = Ceiling of (Total Stay Duration in Hours / 23.5)
 */

export interface RoomCategoryConfig {
  id: "deluxe-pool" | "executive-suite" | "presidential-villa";
  titleEn: string;
  titleBn: string;
  pricePerDayBDT: number;
  image: string;
  alt: string;
  badgeEn: string;
  badgeBn: string;
  categoryEn: string;
  categoryBn: string;
  descEn: string;
  descBn: string;
  featuresEn: string[];
  featuresBn: string[];
  maxCapacity: number;
}

export const STAY_CONFIG = {
  currencySymbol: "৳",
  currencyCode: "BDT",
  defaultCheckInTime: "10:00",
  defaultCheckOutTime: "09:30",
  standardDayHours: 23.5,
  /**
   * Room categories with centralized rates
   */
  rooms: [
    {
      id: "deluxe-pool",
      titleEn: "Deluxe Pool-View Room",
      titleBn: "ডিলাক্স পুল-ভিউ রুম",
      pricePerDayBDT: 6500,
      image: "/images/Hotel%20Rooms/Deluxe%20room.jpg",
      alt: "Deluxe Pool-View Room with King Bed and Poolside Balcony at Magic Island Resort",
      badgeEn: "King Bed • Poolside Balcony",
      badgeBn: "কিং বেড • পুলসাইড ব্যালকনি",
      categoryEn: "Couples & Small Families",
      categoryBn: "কাপল ও ছোট পরিবারের জন্য",
      descEn:
        "Spacious air-conditioned room featuring private balcony overlooking the turquoise wave pool, luxury plush bedding, smart entertainment, and modern bathroom amenities.",
      descBn:
        "বিশাল শীতাতপ নিয়ন্ত্রিত রুম, যেখান থেকে সরাসরি দেখা যায় নীল ওয়েভ পুলের দৃশ্য। সাথে আরামদায়ক কিং বেড, স্মার্ট টিভি, হাই-স্পিড ওয়াইফাই ও আধুনিক বাথরুম সুবিধা।",
      featuresEn: [
        "1 King Bed (2 Adults + 1 Child)",
        "Private Balcony with Wave Pool View",
        "Complimentary Breakfast for 2",
        "Air Conditioned & 24/7 Generator",
        "High-Speed Wi-Fi & Smart TV",
      ],
      featuresBn: [
        "১টি কিং বেড (২ প্রাপ্তবয়স্ক + ১ শিশু)",
        "ওয়েভ পুল ভিউ সহ নিজস্ব ব্যালকনি",
        "২ জনের জন্য কমপ্লিমেন্টারি ব্রেকফাস্ট",
        "শীতাতপ নিয়ন্ত্রিত ও ২৪/৭ জেনারেটর ব্যাকআপ",
        "হাই-স্পিড ওয়াই-ফাই ও স্মার্ট টিভি",
      ],
      maxCapacity: 3,
    },
    {
      id: "executive-suite",
      titleEn: "Executive Family Suite",
      titleBn: "এক্সিকিউটিভ ফ্যামিলি স্যুট",
      pricePerDayBDT: 8000,
      image: "/images/Hotel%20Rooms/Family%20room.webp",
      alt: "Executive Family Suite with 2 Queen Beds and Living Lounge at Magic Island Resort",
      badgeEn: "★ MOST POPULAR • 2 Queen Beds",
      badgeBn: "★ সর্বাধিক জনপ্রিয় • ২টি কুইন বেড",
      categoryEn: "Large Family & Friends Group",
      categoryBn: "বড় পরিবার ও বন্ধু মহলের জন্য",
      descEn:
        "Two interconnected spacious rooms with cozy living lounge, mini-refrigerator, panoramic park horizons, and express VIP access to the water attractions.",
      descBn:
        "পরিবারের সবার একসাথে থাকার জন্য ২টি ইন্টারকানেক্টেড রুম ও ড্রয়িং লাউঞ্জ। সাথে মিনি ফ্রিজ, মনোরম পার্ক ভিউ এবং পার্ক রাইডসে ভিআইপি অগ্রাধিকার সুবিধা।",
      featuresEn: [
        "2 Queen Beds (Up to 4-5 Guests)",
        "Separate Living Area & Sofa Setup",
        "Complimentary Breakfast for 4",
        "Priority VIP Water Park Access",
        "24/7 Room Service & Security",
      ],
      featuresBn: [
        "২টি কুইন বেড (৪-৫ জনের থাকার সুব্যবস্থা)",
        "পৃথক বসার লাউঞ্জ ও সোফা কর্নার",
        "৪ জনের জন্য ফ্রি সুস্বাদু বুফে নাস্তা",
        "ওয়াটার পার্কে ভিআইপি অগ্রাধিকার প্রবেশ",
        "২৪/৭ রুম সার্ভিস ও সার্বক্ষণিক নিরাপত্তা",
      ],
      maxCapacity: 5,
    },
    {
      id: "presidential-villa",
      titleEn: "VIP Presidential Resort Villa",
      titleBn: "ভিআইপি প্রেসিডেন্সিয়াল রিসোর্ট ভিলা",
      pricePerDayBDT: 9500,
      image: "/images/Hotel%20Rooms/Villa%20room.jpg",
      alt: "VIP Presidential Resort Villa with Private Sunset Terrace and Jacuzzi at Magic Island Resort",
      badgeEn: "Ultra Luxury • Private Terrace",
      badgeBn: "আল্ট্রা লাক্সারি • নিজস্ব রুফটপ টেরেস",
      categoryEn: "VIP Getaways & Special Occasions",
      categoryBn: "ভিআইপি গেটঅ্যাওয়ে ও বিশেষ উৎসব",
      descEn:
        "Our finest master retreat boasting private open-air sun terrace, premium jacuzzi soaking tub, dedicated butler service, and complimentary all-inclusive park passes.",
      descBn:
        "আমাদের সর্বশ্রেষ্ঠ লাক্সারি ভিলা। এতে রয়েছে নিজস্ব উন্মুক্ত সান টেরেস, প্রিমিয়াম জাকুজি বাথটাব, সার্বক্ষণিক পার্সোনাল বাটলার সেবা এবং সম্পূর্ণ ফ্রি পার্ক পাস।",
      featuresEn: [
        "Master Bedroom + Guest Bedroom",
        "Private Open-Air Sunset Terrace",
        "Jacuzzi Tub & Luxury Toiletries",
        "Complimentary Unlimited Park Passes",
        "Dedicated Attendant & Fast Check-In",
      ],
      featuresBn: [
        "মাস্টার বেডরুম + পৃথক গেস্ট বেডরুম",
        "সূর্যাস্ত উপভোগের নিজস্ব রুফটপ টেরেস",
        "জাকুজি বাথটাব ও লাক্সারি প্রসাধন",
        "সব জোনের জন্য আনলিমিটেড ফ্রি পার্ক পাস",
        "ডেডিকেটেড অ্যাটেনডেন্ট ও ফাস্ট চেক-ইন",
      ],
      maxCapacity: 6,
    },
  ] as RoomCategoryConfig[],
};

export interface StayCalculationResult {
  isValid: boolean;
  errorMessageEn?: string;
  errorMessageBn?: string;
  totalMinutes: number;
  durationHours: number;
  hours: number;
  minutes: number;
  chargeableDays: number;
  calendarNights: number;
  formattedDurationEn: string;
  formattedDurationBn: string;
  checkInFormattedEn: string;
  checkInFormattedBn: string;
  checkOutFormattedEn: string;
  checkOutFormattedBn: string;
}

const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function toBnDigits(num: number | string): string {
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bn[parseInt(d, 10)]);
}

export function formatTime12h(time24: string): { en: string; bn: string } {
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const mFormatted = m < 10 ? `0${m}` : `${m}`;
  const en = `${h}:${mFormatted} ${ampm}`;
  const bn = `${toBnDigits(h)}:${toBnDigits(mFormatted)} ${ampm}`;
  return { en, bn };
}

export function formatDatePretty(dateStr: string): { en: string; bn: string } {
  const [y, m, d] = dateStr.split("-").map(Number);
  const monthIdx = m - 1;
  const en = `${d} ${EN_MONTHS[monthIdx]} ${y}`;
  const bn = `${toBnDigits(d)} ${BN_MONTHS[monthIdx]} ${toBnDigits(y)}`;
  return { en, bn };
}

/**
 * Calculates stay duration, chargeable days and calendar nights.
 *
 * Rules:
 * - 1 standard day = 10:00 AM to next day 09:30 AM (23.5 hours)
 * - Chargeable Days = Ceiling((Total Stay Duration in Hours + 0.5 - tolerance) / 24)
 *   where (24 * n - 0.5) is the boundary for n days.
 *   - 23.5 hours = 1 day
 *   - 24.0 hours (10:00 AM next day) = 2 days
 *   - 47.5 hours (09:30 AM day 3) = 2 days
 *   - 48.0 hours (10:00 AM day 3) = 3 days
 */
export function calculateStayDuration(
  checkInDateStr: string,
  checkInTimeStr: string,
  checkOutDateStr: string,
  checkOutTimeStr: string
): StayCalculationResult {
  if (!checkInDateStr || !checkInTimeStr || !checkOutDateStr || !checkOutTimeStr) {
    return {
      isValid: false,
      errorMessageEn: "Please select both check-in and check-out dates and times.",
      errorMessageBn: "অনুগ্রহ করে চেক-ইন ও চেক-আউট তারিখ ও সময় নির্ধারণ করুন।",
      totalMinutes: 0,
      durationHours: 0,
      hours: 0,
      minutes: 0,
      chargeableDays: 0,
      calendarNights: 0,
      formattedDurationEn: "",
      formattedDurationBn: "",
      checkInFormattedEn: "",
      checkInFormattedBn: "",
      checkOutFormattedEn: "",
      checkOutFormattedBn: "",
    };
  }

  const [inY, inM, inD] = checkInDateStr.split("-").map(Number);
  const [inH, inMin] = checkInTimeStr.split(":").map(Number);
  const checkInDate = new Date(inY, inM - 1, inD, inH, inMin, 0, 0);

  const [outY, outM, outD] = checkOutDateStr.split("-").map(Number);
  const [outH, outMin] = checkOutTimeStr.split(":").map(Number);
  const checkOutDate = new Date(outY, outM - 1, outD, outH, outMin, 0, 0);

  const diffMs = checkOutDate.getTime() - checkInDate.getTime();

  if (diffMs <= 0) {
    return {
      isValid: false,
      errorMessageEn: "Check-out must be strictly later than check-in date and time.",
      errorMessageBn: "চেক-আউট সময় অবশ্যই চেক-ইন তারিখ ও সময়ের পরবর্তী হতে হবে।",
      totalMinutes: 0,
      durationHours: 0,
      hours: 0,
      minutes: 0,
      chargeableDays: 0,
      calendarNights: 0,
      formattedDurationEn: "",
      formattedDurationBn: "",
      checkInFormattedEn: "",
      checkInFormattedBn: "",
      checkOutFormattedEn: "",
      checkOutFormattedBn: "",
    };
  }

  const totalMinutes = Math.round(diffMs / (1000 * 60));
  const durationHours = totalMinutes / 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Tolerance epsilon (~18 seconds) to prevent floating point inaccuracies:
  const epsilon = 0.005;
  const chargeableDays = Math.max(1, Math.ceil((durationHours + 0.5 - epsilon) / 24));

  // Calendar nights (number of midnight transitions):
  const inDateOnly = new Date(inY, inM - 1, inD);
  const outDateOnly = new Date(outY, outM - 1, outD);
  const calendarNights = Math.max(
    0,
    Math.round((outDateOnly.getTime() - inDateOnly.getTime()) / (1000 * 60 * 60 * 24))
  );

  const inDatePretty = formatDatePretty(checkInDateStr);
  const inTimePretty = formatTime12h(checkInTimeStr);
  const outDatePretty = formatDatePretty(checkOutDateStr);
  const outTimePretty = formatTime12h(checkOutTimeStr);

  const checkInFormattedEn = `${inDatePretty.en}, ${inTimePretty.en}`;
  const checkInFormattedBn = `${inDatePretty.bn}, ${inTimePretty.bn}`;
  const checkOutFormattedEn = `${outDatePretty.en}, ${outTimePretty.en}`;
  const checkOutFormattedBn = `${outDatePretty.bn}, ${outTimePretty.bn}`;

  const formattedDurationEn =
    minutes > 0 ? `${hours} Hours ${minutes} Minutes` : `${hours} Hours`;
  const formattedDurationBn =
    minutes > 0
      ? `${toBnDigits(hours)} ঘণ্টা ${toBnDigits(minutes)} মিনিট`
      : `${toBnDigits(hours)} ঘণ্টা`;

  return {
    isValid: true,
    totalMinutes,
    durationHours,
    hours,
    minutes,
    chargeableDays,
    calendarNights,
    formattedDurationEn,
    formattedDurationBn,
    checkInFormattedEn,
    checkInFormattedBn,
    checkOutFormattedEn,
    checkOutFormattedBn,
  };
}

export interface RoomCostSummary {
  categoryTotals: {
    id: string;
    titleEn: string;
    titleBn: string;
    pricePerDayBDT: number;
    quantity: number;
    subtotalBDT: number;
  }[];
  totalRoomsSelected: number;
  grandTotalBDT: number;
}

export function calculateRoomCosts(
  quantities: Record<string, number>,
  chargeableDays: number
): RoomCostSummary {
  let grandTotalBDT = 0;
  let totalRoomsSelected = 0;

  const categoryTotals = STAY_CONFIG.rooms.map((room) => {
    const qty = Math.max(0, quantities[room.id] || 0);
    const subtotal = room.pricePerDayBDT * qty * chargeableDays;
    grandTotalBDT += subtotal;
    totalRoomsSelected += qty;

    return {
      id: room.id,
      titleEn: room.titleEn,
      titleBn: room.titleBn,
      pricePerDayBDT: room.pricePerDayBDT,
      quantity: qty,
      subtotalBDT: subtotal,
    };
  });

  return {
    categoryTotals,
    totalRoomsSelected,
    grandTotalBDT,
  };
}
