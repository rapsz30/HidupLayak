"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, TrendingUp, Calendar } from "lucide-react"
import { formatCurrency, calculateStatus } from "@/lib/data"
import { MonthlyChart } from "@/components/monthly-chart"
import { ExpenseList } from "@/components/expense-list"
import { InsightReflection } from "@/components/insight-reflection"
import { FutureChoices } from "@/components/future-choices"

type ExpenseCategory = "Makan" | "Tempat Tinggal" | "Transportasi" | "Internet & HP" | "Pendidikan" | "Lainnya"

interface Expense {
  id: string
  date: string
  amount: number
  category: ExpenseCategory
}

interface MonthlyData {
  month: string
  income: number
  expenses: Expense[]
}

const MONTHS = [
  "Januari 2026",
  "Februari 2026",
  "Maret 2026",
  "April 2026",
  "Mei 2026",
  "Juni 2026",
  "Juli 2026",
  "Agustus 2026",
  "September 2026",
  "Oktober 2026",
  "November 2026",
  "Desember 2026",
]

const CATEGORIES: ExpenseCategory[] = [
  "Makan",
  "Tempat Tinggal",
  "Transportasi",
  "Internet & HP",
  "Pendidikan",
  "Lainnya",
]

export default function CatatanPage() {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0])
  const [monthlyData, setMonthlyData] = useState<Record<string, MonthlyData>>({})
  const [showAddExpense, setShowAddExpense] = useState(false)

  // Form state
  const [expenseDate, setExpenseDate] = useState("")
  const [expenseAmount, setExpenseAmount] = useState("")
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>("Makan")
  const [monthlyIncome, setMonthlyIncome] = useState("")

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("hiduplayak-monthly-data")
    if (stored) {
      setMonthlyData(JSON.parse(stored))
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    if (Object.keys(monthlyData).length > 0) {
      localStorage.setItem("hiduplayak-monthly-data", JSON.stringify(monthlyData))
    }
  }, [monthlyData])

  // Initialize current month data
  const currentData = monthlyData[selectedMonth] || { month: selectedMonth, income: 0, expenses: [] }
  const totalExpenses = currentData.expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const remaining = currentData.income - totalExpenses
  const status = calculateStatus(currentData.income, totalExpenses)

  console.log("[v0] CatatanPage - current status:", status)
  console.log("[v0] CatatanPage - income:", currentData.income)
  console.log("[v0] CatatanPage - expenses:", totalExpenses)
  console.log("[v0] CatatanPage - remaining:", remaining)

  const handleAddExpense = () => {
    if (!expenseDate || !expenseAmount) return

    const newExpense: Expense = {
      id: Date.now().toString(),
      date: expenseDate,
      amount: Number.parseInt(expenseAmount),
      category: expenseCategory,
    }

    setMonthlyData({
      ...monthlyData,
      [selectedMonth]: {
        ...currentData,
        expenses: [...currentData.expenses, newExpense],
      },
    })

    setExpenseDate("")
    setExpenseAmount("")
    setExpenseCategory("Makan")
    setShowAddExpense(false)
  }

  const handleUpdateIncome = () => {
    if (!monthlyIncome) return

    setMonthlyData({
      ...monthlyData,
      [selectedMonth]: {
        ...currentData,
        income: Number.parseInt(monthlyIncome),
      },
    })

    setMonthlyIncome("")
  }

  const handleDeleteExpense = (id: string) => {
    setMonthlyData({
      ...monthlyData,
      [selectedMonth]: {
        ...currentData,
        expenses: currentData.expenses.filter((exp) => exp.id !== id),
      },
    })
  }

  // Get previous month for comparison
  const currentMonthIndex = MONTHS.indexOf(selectedMonth)
  const previousMonth = currentMonthIndex > 0 ? MONTHS[currentMonthIndex - 1] : null
  const previousData = previousMonth ? monthlyData[previousMonth] : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Kembali
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Calendar className="size-4" />
              <span>Catatan Hidup Bulanan</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Pahami Pola Keuanganmu</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Catat pemasukan dan pengeluaran bulananmu untuk memahami kondisi finansial tanpa penilaian
            </p>
          </div>

          {/* Month Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Pilih Bulan</CardTitle>
              <CardDescription>Lihat atau catat keuangan bulan tertentu</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Income Section */}
          <Card>
            <CardHeader>
              <CardTitle>Pemasukan Bulanan</CardTitle>
              <CardDescription>Total pendapatan yang kamu terima bulan ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentData.income > 0 ? (
                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="size-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pendapatan</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(currentData.income)}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMonthlyIncome(currentData.income.toString())}
                    className="bg-transparent"
                  >
                    Ubah
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="income">Masukkan pendapatan bulanan</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="contoh: 3500000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleUpdateIncome} className="w-full">
                    Simpan Pendapatan
                  </Button>
                </div>
              )}

              {monthlyIncome && currentData.income > 0 && (
                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="space-y-2">
                    <Label htmlFor="income-update">Perbarui pendapatan</Label>
                    <Input
                      id="income-update"
                      type="number"
                      placeholder="contoh: 3500000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleUpdateIncome} className="w-full" variant="secondary">
                    Perbarui Pendapatan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Card */}
          {currentData.income > 0 && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Ringkasan Bulan Ini</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/20">
                    <p className="text-sm text-muted-foreground mb-1">Total Pengeluaran</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(totalExpenses)}</p>
                  </div>

                  <div className={`p-4 rounded-lg ${remaining >= 0 ? "bg-green-500/10" : "bg-red-500/10"}`}>
                    <p className="text-sm text-muted-foreground mb-1">Sisa Saldo</p>
                    <p className={`text-2xl font-bold ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatCurrency(remaining)}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/20">
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <p className={`text-2xl font-bold ${status.color}`}>{status.status}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center pt-2">{status.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Add Expense Section */}
          {currentData.income > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Catatan Pengeluaran Harian</CardTitle>
                    <CardDescription>Tambahkan pengeluaran yang terjadi</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setShowAddExpense(!showAddExpense)}>
                    <Plus className="size-4 mr-1" />
                    Tambah
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showAddExpense && (
                  <div className="p-4 border border-border rounded-lg space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Tanggal</Label>
                      <Input
                        id="date"
                        type="date"
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Jumlah (Rp)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="contoh: 50000"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select
                        value={expenseCategory}
                        onValueChange={(val) => setExpenseCategory(val as ExpenseCategory)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleAddExpense} className="flex-1">
                        Simpan
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddExpense(false)} className="bg-transparent">
                        Batal
                      </Button>
                    </div>
                  </div>
                )}

                <ExpenseList expenses={currentData.expenses} onDelete={handleDeleteExpense} />
              </CardContent>
            </Card>
          )}

          {/* Visualization */}
          {currentData.income > 0 && currentData.expenses.length > 0 && (
            <MonthlyChart expenses={currentData.expenses} />
          )}

          {/* Reflection Insights */}
          {currentData.income > 0 && currentData.expenses.length > 0 && (
            <InsightReflection
              income={currentData.income}
              expenses={currentData.expenses}
              previousMonthExpenses={previousData?.expenses || []}
            />
          )}

          {/* Future Choices */}
          <FutureChoices status={status.status} remaining={remaining} month={selectedMonth} />
        </div>
      </div>
    </div>
  )
}
