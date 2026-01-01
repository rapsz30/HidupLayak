"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/data"

interface ExpenseChartProps {
  expenses: {
    food: number
    housing: number
    transportation: number
    internet: number
    utilities: number
  }
}

const expenseLabels = {
  food: "Makan",
  housing: "Tempat Tinggal",
  transportation: "Transportasi",
  internet: "Internet",
  utilities: "Listrik & Air",
}

const expenseColors = {
  food: "bg-blue-500",
  housing: "bg-indigo-500",
  transportation: "bg-purple-500",
  internet: "bg-pink-500",
  utilities: "bg-cyan-500",
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const total = Object.values(expenses).reduce((sum, value) => sum + value, 0)

  const expenseData = Object.entries(expenses).map(([key, value]) => ({
    label: expenseLabels[key as keyof typeof expenseLabels],
    value,
    percentage: ((value / total) * 100).toFixed(1),
    color: expenseColors[key as keyof typeof expenseColors],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rincian Pengeluaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenseData.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{item.label}</span>
              <span className="text-muted-foreground">
                {item.percentage}% · {formatCurrency(item.value)}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${item.color} transition-all duration-300`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">{formatCurrency(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
