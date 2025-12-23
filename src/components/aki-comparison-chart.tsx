"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"

interface AKIComparisonChartProps {
  before: number | null
  after: number | null
}

export function AKIComparisonChart({ before, after }: AKIComparisonChartProps) {
  const data = [
    { name: "Before", score: before ?? 0, fill: "#94a3b8" },
    { name: "After", score: after ?? 0, fill: "#2563eb" },
  ].filter(d => (d.name === "Before" && before !== null) || (d.name === "After" && after !== null))

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
