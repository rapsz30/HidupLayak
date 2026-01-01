// Mock data for cost of living in different cities

export type City = "Jakarta" | "Yogyakarta" | "Cirebon"
export type Role = "Student" | "University Student" | "Worker"

export interface CityData {
  name: string
  baseIncome: {
    Student: number
    "University Student": number
    Worker: number
  }
  costs: {
    food: { min: number; max: number; default: number }
    housing: { min: number; max: number; default: number }
    transportation: { min: number; max: number; default: number }
    internet: { min: number; max: number; default: number }
    utilities: { min: number; max: number; default: number }
  }
}

export const cityData: Record<City, CityData> = {
  Jakarta: {
    name: "Jakarta",
    baseIncome: {
      Student: 1500000,
      "University Student": 2000000,
      Worker: 4800000,
    },
    costs: {
      food: { min: 1000000, max: 3000000, default: 1800000 },
      housing: { min: 1500000, max: 5000000, default: 2500000 },
      transportation: { min: 300000, max: 1500000, default: 600000 },
      internet: { min: 200000, max: 500000, default: 300000 },
      utilities: { min: 300000, max: 800000, default: 400000 },
    },
  },
  Yogyakarta: {
    name: "Yogyakarta",
    baseIncome: {
      Student: 1200000,
      "University Student": 1800000,
      Worker: 3500000,
    },
    costs: {
      food: { min: 800000, max: 2000000, default: 1200000 },
      housing: { min: 800000, max: 3000000, default: 1500000 },
      transportation: { min: 200000, max: 800000, default: 400000 },
      internet: { min: 150000, max: 400000, default: 250000 },
      utilities: { min: 200000, max: 600000, default: 300000 },
    },
  },
  Cirebon: {
    name: "Cirebon",
    baseIncome: {
      Student: 1000000,
      "University Student": 1500000,
      Worker: 3000000,
    },
    costs: {
      food: { min: 700000, max: 1800000, default: 1000000 },
      housing: { min: 600000, max: 2000000, default: 1000000 },
      transportation: { min: 150000, max: 600000, default: 300000 },
      internet: { min: 150000, max: 350000, default: 200000 },
      utilities: { min: 150000, max: 500000, default: 250000 },
    },
  },
}

export interface RandomEvent {
  id: string
  title: string
  description: string
  impact: number
  type: "expense" | "income"
  emoji: string
}

export const randomEvents: RandomEvent[] = [
  {
    id: "health-emergency",
    title: "Sakit Mendadak",
    description: "Kamu harus ke klinik karena demam tinggi. Biaya obat dan konsultasi.",
    impact: -250000,
    type: "expense",
    emoji: "🏥",
  },
  {
    id: "transport-breakdown",
    title: "Motor Mogok",
    description: "Motor rusak dan harus ke bengkel. Ganti spare part lumayan mahal.",
    impact: -400000,
    type: "expense",
    emoji: "🛵",
  },
  {
    id: "price-increase",
    title: "Harga Naik",
    description: "Harga sembako dan bensin naik. Pengeluaran bulanan meningkat.",
    impact: -200000,
    type: "expense",
    emoji: "📈",
  },
  {
    id: "family-emergency",
    title: "Darurat Keluarga",
    description: "Keluarga butuh bantuan mendadak. Kamu harus transfer uang.",
    impact: -500000,
    type: "expense",
    emoji: "👨‍👩‍👧",
  },
  {
    id: "phone-broken",
    title: "HP Rusak",
    description: "Layar HP pecah. Harus ganti atau service segera.",
    impact: -300000,
    type: "expense",
    emoji: "📱",
  },
  {
    id: "bonus-job",
    title: "Dapat Kerjaan Sampingan",
    description: "Freelance project berhasil! Dapat tambahan pemasukan.",
    impact: 500000,
    type: "income",
    emoji: "💼",
  },
  {
    id: "unexpected-gift",
    title: "Rezeki Nomplok",
    description: "Dapat hadiah atau bonus tak terduga dari keluarga.",
    impact: 300000,
    type: "income",
    emoji: "🎁",
  },
  {
    id: "friend-birthday",
    title: "Ulang Tahun Teman",
    description: "Teman dekat ultah, harus kasih kado dan ikut nongkrong.",
    impact: -150000,
    type: "expense",
    emoji: "🎂",
  },
]

export function getRandomEvent(): RandomEvent {
  return randomEvents[Math.floor(Math.random() * randomEvents.length)]
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function calculateStatus(
  income: number,
  expenses: number,
): {
  status: "Layak" | "Pas-pasan" | "Defisit"
  color: string
  description: string
} {
  const remaining = income - expenses
  const percentage = (remaining / income) * 100

  if (percentage >= 20) {
    return {
      status: "Layak",
      color: "text-green-600 dark:text-green-400",
      description: "Pendapatan mencukupi untuk hidup layak dengan sisa untuk tabungan",
    }
  } else if (percentage >= 0) {
    return {
      status: "Pas-pasan",
      color: "text-yellow-600 dark:text-yellow-400",
      description: "Pendapatan pas-pasan, tidak ada ruang untuk tabungan atau kejutan",
    }
  } else {
    return {
      status: "Defisit",
      color: "text-red-600 dark:text-red-400",
      description: "Pengeluaran melebihi pendapatan, perlu mencari tambahan atau mengurangi biaya",
    }
  }
}
