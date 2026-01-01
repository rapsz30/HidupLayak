"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, TrendingDown } from "lucide-react"

interface Expense {
  id: string
  date: string
  amount: number
  category: string
}

interface InsightReflectionProps {
  income: number
  expenses: Expense[]
  previousMonthExpenses: Expense[]
}

export function InsightReflection({ income, expenses, previousMonthExpenses }: InsightReflectionProps) {
  // Calculate category dominance
  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const dominantCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const previousTotal = previousMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  // Generate insights
  const insights: string[] = []

  // Dominant category insight
  if (dominantCategory) {
    const percentage = ((dominantCategory[1] / totalExpenses) * 100).toFixed(0)
    insights.push(`Pengeluaran ${dominantCategory[0]} mendominasi ${percentage}% dari total pengeluaran bulan ini.`)
  }

  // Income vs expenses insight
  const remaining = income - totalExpenses
  if (remaining < 0) {
    insights.push(
      "Pendapatan belum sepenuhnya menutup kebutuhan dasar. Kondisi ini umum dialami banyak orang di Indonesia.",
    )
  } else if (remaining < income * 0.2) {
    insights.push("Sisa pendapatan cukup tipis. Banyak orang mengalami kondisi serupa, kamu tidak sendirian.")
  }

  // Comparison with previous month
  if (previousTotal > 0) {
    const change = ((totalExpenses - previousTotal) / previousTotal) * 100
    if (change > 10) {
      insights.push(`Pengeluaran naik ${change.toFixed(0)}% dari bulan lalu. Ini normal karena kebutuhan yang berubah.`)
    } else if (change < -10) {
      insights.push(`Pengeluaran turun ${Math.abs(change).toFixed(0)}% dari bulan lalu.`)
    } else {
      insights.push("Pola pengeluaran relatif stabil dibanding bulan lalu.")
    }
  }

  // General empathy message
  insights.push("Hidup layak adalah hak setiap orang. Memahami pola keuangan adalah langkah pertama.")

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="size-5 text-primary" />
          <CardTitle>Refleksi Non-Judgemental</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-card/50 rounded-lg">
            <div className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
          </div>
        ))}

        {previousMonthExpenses.length > 0 && (
          <div className="pt-3 mt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {totalExpenses > previousTotal ? (
                  <TrendingUp className="size-4 text-orange-500" />
                ) : (
                  <TrendingDown className="size-4 text-green-500" />
                )}
                <span className="text-sm text-muted-foreground">vs bulan lalu</span>
              </div>
              <span
                className={`text-sm font-semibold ${totalExpenses > previousTotal ? "text-orange-600" : "text-green-600"}`}
              >
                {totalExpenses > previousTotal ? "+" : ""}
                {(((totalExpenses - previousTotal) / previousTotal) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
