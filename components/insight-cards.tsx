import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, TrendingDown, Heart } from "lucide-react"

const insights = [
  {
    icon: AlertCircle,
    title: "UMR belum tentu cukup",
    description:
      "Upah Minimum Regional (UMR) sering kali tidak mencukupi untuk hidup layak, terutama di kota besar. Perencanaan finansial yang baik sangat penting.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: TrendingDown,
    title: "Biaya hidup berbeda tiap kota",
    description:
      "Biaya hidup di Jakarta, Yogyakarta, dan Cirebon sangat berbeda. Perbedaan bisa mencapai 50-100% untuk kategori seperti tempat tinggal dan transportasi.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Heart,
    title: "Hidup layak bukan hidup mewah",
    description:
      "Hidup layak berarti bisa memenuhi kebutuhan dasar dengan nyaman dan memiliki sedikit ruang untuk tabungan. Ini adalah hak dasar, bukan kemewahan.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
]

export function InsightCards() {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-balance">Fakta Penting</h2>
        <p className="text-muted-foreground text-pretty">Hal-hal yang perlu kamu tahu tentang biaya hidup</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <Card key={insight.title} className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className={`size-12 rounded-xl ${insight.bgColor} flex items-center justify-center mb-2`}>
                <insight.icon className={`size-6 ${insight.color}`} />
              </div>
              <CardTitle className="text-lg">{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
