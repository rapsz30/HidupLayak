import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, TrendingUp, MapPin, Wallet, BookOpen } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <Wallet className="size-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">HidupLayak</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/simulator"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Simulator
            </Link>
            <Link
              href="/catatan"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Catatan Bulanan
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <TrendingUp className="size-4" />
            <span>Platform Edukasi Finansial untuk Gen Z Indonesia</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
            Hidup itu mahal. <br />
            <span className="text-primary">Yuk pahami hidup layak</span> di Indonesia.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Simulasi interaktif untuk memahami biaya hidup realistis di berbagai kota Indonesia, sesuai dengan
            Sustainable Development Goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto group bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/simulator">
                Mulai Simulasi
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              <Link href="/catatan">Catat Keuanganmu</Link>
            </Button>
          </div>

          {/* SDG Badges */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Mendukung Sustainable Development Goals:</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { number: 1, title: "No Poverty", color: "bg-red-500" },
                { number: 8, title: "Decent Work", color: "bg-rose-600" },
                { number: 10, title: "Reduced Inequalities", color: "bg-pink-500" },
                { number: 11, title: "Sustainable Cities", color: "bg-orange-500" },
              ].map((sdg) => (
                <div
                  key={sdg.number}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border"
                >
                  <div
                    className={`size-8 rounded ${sdg.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {sdg.number}
                  </div>
                  <span className="text-sm font-medium text-foreground">{sdg.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Pahami Realita Biaya Hidup</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Dua cara interaktif untuk memahami kondisi ekonomi Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Simulator Card */}
            <Card className="p-8 hover:shadow-lg transition-shadow border-border">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <MapPin className="size-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Simulator Biaya Hidup</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Hitung biaya hidup bulanan di Jakarta, Yogyakarta, dan Cirebon. Sesuaikan dengan peranmu: pelajar,
                mahasiswa, atau pekerja.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Pilih kota dan peran",
                  "Atur komponen biaya",
                  "Lihat status keuangan",
                  "Visualisasi pengeluaran",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/simulator">Mulai Simulasi</Link>
              </Button>
            </Card>

            {/* Catatan Hidup Bulanan Card */}
            <Card className="p-8 hover:shadow-lg transition-shadow border-border bg-gradient-to-br from-secondary/5 to-accent/5">
              <div className="size-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <BookOpen className="size-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Catatan Hidup Bulanan</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Catat pemasukan dan pengeluaran bulananmu untuk memahami pola keuangan dengan cara yang empatik dan
                tanpa penilaian.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Input pendapatan bulanan",
                  "Catat pengeluaran harian",
                  "Visualisasi per kategori",
                  "Refleksi non-judgemental",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="size-1.5 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant="secondary"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Link href="/catatan">Mulai Mencatat</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded bg-primary flex items-center justify-center">
                <Wallet className="size-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">HidupLayak</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Platform edukasi finansial untuk Gen Z Indonesia © 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
