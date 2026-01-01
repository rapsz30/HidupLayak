"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, PiggyBank, Shield, GraduationCap, Clock, Info } from "lucide-react"

interface FutureChoice {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  outcome: {
    timeline: string
    state: "Stabil" | "Lebih Aman" | "Tidak Berubah"
    reflection: string
  }
}

const FUTURE_CHOICES: FutureChoice[] = [
  {
    id: "saving-small",
    title: "Menabung kecil (Rp50.000 / bulan)",
    description: "Menyisihkan nominal kecil secara konsisten untuk masa depan",
    icon: <PiggyBank className="size-5" />,
    outcome: {
      timeline: "3-12 bulan",
      state: "Lebih Aman",
      reflection:
        "Menabung kecil terasa berat di awal, tapi memberi rasa aman. Dalam 6 bulan, kamu bisa punya Rp300.000 untuk situasi darurat.",
    },
  },
  {
    id: "emergency-fund",
    title: "Dana darurat",
    description: "Menyiapkan cadangan untuk kebutuhan mendesak yang tidak terduga",
    icon: <Shield className="size-5" />,
    outcome: {
      timeline: "6-12 bulan",
      state: "Lebih Aman",
      reflection:
        "Dana darurat memberikan ketenangan pikiran. Tidak semua orang mampu memulainya, tapi langkah kecil sudah berarti.",
    },
  },
  {
    id: "learn-skill",
    title: "Belajar / kursus murah",
    description: "Investasi pada diri sendiri melalui pembelajaran keterampilan baru",
    icon: <GraduationCap className="size-5" />,
    outcome: {
      timeline: "3-6 bulan",
      state: "Stabil",
      reflection:
        "Belajar hal baru bisa membuka peluang di masa depan. Prosesnya butuh waktu, tapi bisa jadi aset jangka panjang.",
    },
  },
  {
    id: "no-saving",
    title: "Tidak menyisihkan uang bulan ini",
    description: "Fokus memenuhi kebutuhan dasar dulu tanpa beban tambahan",
    icon: <Clock className="size-5" />,
    outcome: {
      timeline: "1 bulan",
      state: "Tidak Berubah",
      reflection:
        "Tidak semua orang punya ruang untuk menyiapkan masa depan. Pilihan ini wajar dalam kondisi ekonomi tertentu. Yang penting kebutuhan dasar terpenuhi.",
    },
  },
]

interface FutureChoicesProps {
  status: string
  remaining: number
  month: string
}

export function FutureChoices({ status, remaining, month }: FutureChoicesProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [savedChoices, setSavedChoices] = useState<Record<string, string>>({})

  // Load saved choices from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("hiduplayak-future-choices")
    if (stored) {
      setSavedChoices(JSON.parse(stored))
    }
  }, [])

  // Check if this month already has a saved choice
  useEffect(() => {
    if (savedChoices[month]) {
      setSelectedChoice(savedChoices[month])
    }
  }, [month, savedChoices])

  console.log("[v0] FutureChoices - status:", status)
  console.log("[v0] FutureChoices - should render:", status === "Pas-pasan" || status === "Defisit")

  // Only show for Pas-pasan or Defisit status
  if (status !== "Pas-pasan" && status !== "Defisit") {
    console.log("[v0] FutureChoices not rendering - status is:", status)
    return null
  }

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoice(choiceId)
    const newChoices = { ...savedChoices, [month]: choiceId }
    setSavedChoices(newChoices)
    localStorage.setItem("hiduplayak-future-choices", JSON.stringify(newChoices))
  }

  const selectedChoiceData = FUTURE_CHOICES.find((c) => c.id === selectedChoice)

  return (
    <Card className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-200/50">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
            <Sparkles className="size-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-indigo-900">Pilihan Masa Depan</CardTitle>
            <CardDescription className="mt-1.5">
              Dalam kondisi hidup pas-pasan, setiap keputusan kecil punya dampak yang berbeda
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!selectedChoice ? (
          <>
            <div className="space-y-3">
              {FUTURE_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice.id)}
                  className="w-full p-4 rounded-lg border border-border hover:border-indigo-300 hover:bg-indigo-500/5 transition-all text-left group"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                      {choice.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{choice.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{choice.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Alert className="bg-amber-500/5 border-amber-200/50">
              <Info className="size-4 text-amber-600" />
              <AlertDescription className="text-sm text-muted-foreground">
                Pilihan ini bersifat reflektif dan tidak mengikat. Kamu bisa mengubahnya kapan saja.
              </AlertDescription>
            </Alert>
          </>
        ) : (
          <>
            {/* Selected Choice Display */}
            <div className="p-5 rounded-lg border-2 border-indigo-200 bg-indigo-500/5">
              <div className="flex items-start gap-3 mb-4">
                <div className="size-12 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                  {selectedChoiceData?.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{selectedChoiceData?.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedChoiceData?.description}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-indigo-200/50">
                {/* Timeline */}
                <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Estimasi waktu</span>
                  <span className="text-sm font-semibold text-foreground">{selectedChoiceData?.outcome.timeline}</span>
                </div>

                {/* Outcome State */}
                <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Dampak pada kondisi</span>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      selectedChoiceData?.outcome.state === "Lebih Aman"
                        ? "bg-green-500/10 text-green-700"
                        : selectedChoiceData?.outcome.state === "Stabil"
                          ? "bg-blue-500/10 text-blue-700"
                          : "bg-gray-500/10 text-gray-700"
                    }`}
                  >
                    {selectedChoiceData?.outcome.state}
                  </span>
                </div>

                {/* Reflection */}
                <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg">
                  <h5 className="text-sm font-semibold text-foreground mb-2">Refleksi</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedChoiceData?.outcome.reflection}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedChoice(null)}
                className="w-full mt-4 bg-transparent"
              >
                Ubah Pilihan
              </Button>
            </div>
          </>
        )}

        {/* Disclaimer */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Fitur ini bersifat simulasi dan edukasi, bukan saran keuangan atau investasi. Keputusan finansial sepenuhnya
            berada di tanganmu.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
