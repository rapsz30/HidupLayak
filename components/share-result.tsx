"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2 } from "lucide-react"
import { formatCurrency, type City } from "@/lib/data"

interface ShareResultProps {
  city: City
  totalExpenses: number
  status: "Layak" | "Pas-pasan" | "Defisit"
  income: number
}

export function ShareResult({ city, totalExpenses, status, income }: ShareResultProps) {
  const handleShare = () => {
    const text = `Hasil simulasi biaya hidup di ${city}:\n\nPendapatan: ${formatCurrency(income)}\nPengeluaran: ${formatCurrency(totalExpenses)}\nStatus: ${status}\n\nCoba simulasi kamu di HidupLayak!`

    if (navigator.share) {
      navigator
        .share({
          title: "HidupLayak - Hasil Simulasi",
          text,
        })
        .catch((err) => console.error("Error sharing:", err))
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard
        .writeText(text)
        .then(() => alert("Hasil disalin ke clipboard!"))
        .catch((err) => console.error("Error copying:", err))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bagikan Hasil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary/20 space-y-2">
            <div className="text-sm text-muted-foreground">Kota</div>
            <div className="font-semibold text-foreground">{city}</div>
            <div className="text-sm text-muted-foreground pt-2">Total Biaya</div>
            <div className="font-bold text-lg text-foreground">{formatCurrency(totalExpenses)}</div>
            <div className="text-sm text-muted-foreground pt-2">Status</div>
            <div className="font-semibold text-foreground">{status}</div>
          </div>

          <Button onClick={handleShare} className="w-full bg-transparent" variant="outline">
            <Share2 className="mr-2 size-4" />
            Bagikan Hasil
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
