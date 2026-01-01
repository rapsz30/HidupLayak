"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/data"

interface Expense {
  id: string
  date: string
  amount: number
  category: string
}

interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: string) => void
}

const CATEGORY_COLORS: Record<string, string> = {
  Makan: "bg-orange-500/10 text-orange-600",
  "Tempat Tinggal": "bg-blue-500/10 text-blue-600",
  Transportasi: "bg-green-500/10 text-green-600",
  "Internet & HP": "bg-purple-500/10 text-purple-600",
  Pendidikan: "bg-pink-500/10 text-pink-600",
  Lainnya: "bg-gray-500/10 text-gray-600",
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Belum ada catatan pengeluaran</p>
      </div>
    )
  }

  // Sort by date descending
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-2">
      {sortedExpenses.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
          <div className="flex items-center gap-3 flex-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${CATEGORY_COLORS[expense.category]}`}>
                  {expense.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(expense.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="font-semibold text-foreground">{formatCurrency(expense.amount)}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onDelete(expense.id)}>
            <Trash2 className="size-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  )
}
