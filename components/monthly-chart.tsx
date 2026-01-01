"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface Expense {
  id: string
  date: string
  amount: number
  category: string
}

interface MonthlyChartProps {
  expenses: Expense[]
}

const COLORS = {
  Makan: "hsl(var(--chart-1))",
  "Tempat Tinggal": "hsl(var(--chart-2))",
  Transportasi: "hsl(var(--chart-3))",
  "Internet & HP": "hsl(var(--chart-4))",
  Pendidikan: "hsl(var(--chart-5))",
  Lainnya: "hsl(var(--muted-foreground))",
}

export function MonthlyChart({ expenses }: MonthlyChartProps) {
  // Group expenses by category
  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualisasi Pengeluaran</CardTitle>
        <CardDescription>Breakdown pengeluaran per kategori</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) =>
                  new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(value)
                }
              />
              <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.category as keyof typeof COLORS]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
