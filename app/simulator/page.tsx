"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft } from "lucide-react"
import { cityData, calculateStatus, formatCurrency, type City, type Role } from "@/lib/data"
import { ExpenseChart } from "@/components/expense-chart"
import { ShareResult } from "@/components/share-result"
import { InsightCards } from "@/components/insight-cards"

export default function SimulatorPage() {
  const [city, setCity] = useState<City>("Jakarta")
  const [role, setRole] = useState<Role>("Worker")

  const currentCityData = cityData[city]
  const income = currentCityData.baseIncome[role]

  const [expenses, setExpenses] = useState({
    food: currentCityData.costs.food.default,
    housing: currentCityData.costs.housing.default,
    transportation: currentCityData.costs.transportation.default,
    internet: currentCityData.costs.internet.default,
    utilities: currentCityData.costs.utilities.default,
  })

  // Update expenses when city changes
  const handleCityChange = (newCity: City) => {
    setCity(newCity)
    const newCityData = cityData[newCity]
    setExpenses({
      food: newCityData.costs.food.default,
      housing: newCityData.costs.housing.default,
      transportation: newCityData.costs.transportation.default,
      internet: newCityData.costs.internet.default,
      utilities: newCityData.costs.utilities.default,
    })
  }

  const totalExpenses =
    expenses.food + expenses.housing + expenses.transportation + expenses.internet + expenses.utilities

  const statusInfo = calculateStatus(income, totalExpenses)
  const remaining = income - totalExpenses

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
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Simulator Biaya Hidup</h1>
            <p className="text-muted-foreground text-pretty">Hitung berapa biaya hidup layak sesuai kota dan peranmu</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left Panel - Controls */}
            <div className="lg:col-span-3 space-y-6">
              {/* City and Role Selector */}
              <Card>
                <CardHeader>
                  <CardTitle>Pilih Profil</CardTitle>
                  <CardDescription>Tentukan kota dan peran yang sesuai denganmu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Kota</Label>
                    <Select value={city} onValueChange={(value) => handleCityChange(value as City)}>
                      <SelectTrigger id="city">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Jakarta">Jakarta</SelectItem>
                        <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                        <SelectItem value="Cirebon">Cirebon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Peran</Label>
                    <Select value={role} onValueChange={(value) => setRole(value as Role)}>
                      <SelectTrigger id="role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Student">Pelajar SMA</SelectItem>
                        <SelectItem value="University Student">Mahasiswa</SelectItem>
                        <SelectItem value="Worker">Pekerja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2 px-4 py-3 bg-secondary/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Pendapatan Bulanan</span>
                      <span className="text-lg font-bold text-foreground">{formatCurrency(income)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expense Sliders */}
              <Card>
                <CardHeader>
                  <CardTitle>Atur Pengeluaran Bulanan</CardTitle>
                  <CardDescription>Geser untuk menyesuaikan biaya setiap kategori</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Food */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="food">Makan & Minum</Label>
                      <span className="text-sm font-semibold text-foreground">{formatCurrency(expenses.food)}</span>
                    </div>
                    <Slider
                      id="food"
                      min={currentCityData.costs.food.min}
                      max={currentCityData.costs.food.max}
                      step={50000}
                      value={[expenses.food]}
                      onValueChange={([value]) => setExpenses({ ...expenses, food: value })}
                      className="w-full"
                    />
                  </div>

                  {/* Housing */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="housing">Tempat Tinggal (Kost/Kontrakan)</Label>
                      <span className="text-sm font-semibold text-foreground">{formatCurrency(expenses.housing)}</span>
                    </div>
                    <Slider
                      id="housing"
                      min={currentCityData.costs.housing.min}
                      max={currentCityData.costs.housing.max}
                      step={100000}
                      value={[expenses.housing]}
                      onValueChange={([value]) => setExpenses({ ...expenses, housing: value })}
                      className="w-full"
                    />
                  </div>

                  {/* Transportation */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transportation">Transportasi</Label>
                      <span className="text-sm font-semibold text-foreground">
                        {formatCurrency(expenses.transportation)}
                      </span>
                    </div>
                    <Slider
                      id="transportation"
                      min={currentCityData.costs.transportation.min}
                      max={currentCityData.costs.transportation.max}
                      step={50000}
                      value={[expenses.transportation]}
                      onValueChange={([value]) => setExpenses({ ...expenses, transportation: value })}
                      className="w-full"
                    />
                  </div>

                  {/* Internet */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="internet">Internet & Pulsa</Label>
                      <span className="text-sm font-semibold text-foreground">{formatCurrency(expenses.internet)}</span>
                    </div>
                    <Slider
                      id="internet"
                      min={currentCityData.costs.internet.min}
                      max={currentCityData.costs.internet.max}
                      step={25000}
                      value={[expenses.internet]}
                      onValueChange={([value]) => setExpenses({ ...expenses, internet: value })}
                      className="w-full"
                    />
                  </div>

                  {/* Utilities */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="utilities">Listrik & Air</Label>
                      <span className="text-sm font-semibold text-foreground">
                        {formatCurrency(expenses.utilities)}
                      </span>
                    </div>
                    <Slider
                      id="utilities"
                      min={currentCityData.costs.utilities.min}
                      max={currentCityData.costs.utilities.max}
                      step={25000}
                      value={[expenses.utilities]}
                      onValueChange={([value]) => setExpenses({ ...expenses, utilities: value })}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Status Keuangan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <div className={`text-4xl font-bold mb-2 ${statusInfo.color}`}>{statusInfo.status}</div>
                    <p className="text-sm text-muted-foreground text-balance">{statusInfo.description}</p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Pendapatan</span>
                      <span className="font-semibold text-foreground">{formatCurrency(income)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Pengeluaran</span>
                      <span className="font-semibold text-foreground">{formatCurrency(totalExpenses)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-sm font-medium text-foreground">Sisa / Kurang</span>
                      <span className={`font-bold ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {formatCurrency(remaining)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              <ExpenseChart expenses={expenses} />

              {/* Share Result */}
              <ShareResult city={city} totalExpenses={totalExpenses} status={statusInfo.status} income={income} />
            </div>
          </div>

          <InsightCards />
        </div>
      </div>
    </div>
  )
}
