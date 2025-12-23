"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AKIComparisonChart } from "@/components/aki-comparison-chart"
import { Button } from "@/components/ui/button"
import { Download, ArrowUpRight, TrendingUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Evaluation {
  id: string
  full_name: string
  role: string
  university: string
  faculty_department: string
  academic_year: string
  evaluation_phase: string
  aki_score: number
  created_at: string
}

interface GroupedEvaluation {
  fullName: string
  role: string
  university: string
  dept: string
  before: Evaluation | null
  after: Evaluation | null
}

export default function DashboardPage() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvaluations()
  }, [])

  async function fetchEvaluations() {
    const { data, error } = await supabase
      .from("evaluations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setEvaluations(data || [])
    }
    setLoading(false)
  }

  const grouped = evaluations.reduce((acc: Record<string, GroupedEvaluation>, curr) => {
    const key = curr.full_name
    if (!acc[key]) {
      acc[key] = {
        fullName: curr.full_name,
        role: curr.role,
        university: curr.university,
        dept: curr.faculty_department,
        before: null,
        after: null,
      }
    }
    if (curr.evaluation_phase === "Before Training") {
      acc[key].before = curr
    } else {
      acc[key].after = curr
    }
    return acc
  }, {})

  const filteredGroups = Object.values(grouped).filter(g => 
    g.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.university.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRecommendation = (score: number) => {
    if (score < 50) return { label: "Needs Additional Training", color: "destructive" }
    if (score <= 70) return { label: "Monitor and Improve", color: "warning" }
    return { label: "Eligible for Promotion / Int. Conference", color: "success" }
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AKI Dashboard</h1>
            <p className="text-muted-foreground">National Academic Performance Monitoring System</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search candidates..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => window.print()} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading evaluations...</div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-center py-20 rounded-xl border border-dashed bg-white">
            <p className="text-muted-foreground">No evaluations found. Start by adding a new evaluation.</p>
            <Button className="mt-4" onClick={() => window.location.href = "/form"}>Add Evaluation</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {filteredGroups.map((group) => {
              const latestScore = group.after?.aki_score ?? group.before?.aki_score ?? 0
              const recommendation = getRecommendation(latestScore)
              const improvement = group.after && group.before ? group.after.aki_score - group.before.aki_score : null

              return (
                <Card key={group.fullName} className="overflow-hidden border-none shadow-md">
                  <CardHeader className="bg-white pb-2 dark:bg-zinc-900">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{group.fullName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{group.role} • {group.university}</p>
                        <p className="text-xs text-muted-foreground">{group.dept}</p>
                      </div>
                      <Badge variant={recommendation.color === "destructive" ? "destructive" : "secondary"} className={
                        recommendation.color === "success" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" :
                        recommendation.color === "warning" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400" : ""
                      }>
                        {recommendation.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="bg-white p-6 dark:bg-zinc-900">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-1">
                        <span className="text-xs font-medium uppercase text-muted-foreground">Current AKI</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">{latestScore}</span>
                          <span className="text-sm text-muted-foreground">/ 100</span>
                        </div>
                      </div>
                      
                      {improvement !== null && (
                        <div className="space-y-1">
                          <span className="text-xs font-medium uppercase text-muted-foreground">Improvement</span>
                          <div className={`flex items-center gap-1 text-2xl font-bold ${improvement >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {improvement >= 0 ? '+' : ''}{improvement}
                            <ArrowUpRight className={`h-5 w-5 ${improvement >= 0 ? '' : 'rotate-90'}`} />
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        <span className="text-xs font-medium uppercase text-muted-foreground">Phase</span>
                        <div className="text-lg font-semibold">
                          {group.after ? "Post-Training" : "Initial Assessment"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                      <h4 className="mb-4 text-sm font-semibold">AKI Score Comparison</h4>
                      <AKIComparisonChart 
                        before={group.before?.aki_score ?? null} 
                        after={group.after?.aki_score ?? null} 
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
