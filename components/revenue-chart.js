"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function RevenueChart() {
  const [timeRange, setTimeRange] = useState("all") // "all" or "72h"
  const [viewMode, setViewMode] = useState("percentage") // "percentage" or "amount"

  // 模拟数据 (后续替换为真实数据)
  const mockData = Array.from({ length: 20 }, (_, i) => ({
    time: `${i * 5}m`,
    percentage: Math.random() * 20 - 5,
    amount: 10000 + Math.random() * 2000 - 500,
  }))

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-lg font-medium">Revenue Chart</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("percentage")}
            className="px-3 py-1 text-sm border transition-opacity hover:opacity-60"
            style={{
              borderColor: "var(--border)",
              backgroundColor: viewMode === "percentage" ? "var(--accent)" : "transparent",
              color: viewMode === "percentage" ? "var(--background)" : "var(--foreground)",
            }}
          >
            %
          </button>
          <button
            onClick={() => setViewMode("amount")}
            className="px-3 py-1 text-sm border transition-opacity hover:opacity-60"
            style={{
              borderColor: "var(--border)",
              backgroundColor: viewMode === "amount" ? "var(--accent)" : "transparent",
              color: viewMode === "amount" ? "var(--background)" : "var(--foreground)",
            }}
          >
            $
          </button>
          <button
            onClick={() => setTimeRange("all")}
            className="px-3 py-1 text-sm border transition-opacity hover:opacity-60"
            style={{
              borderColor: "var(--border)",
              backgroundColor: timeRange === "all" ? "var(--accent)" : "transparent",
              color: timeRange === "all" ? "var(--background)" : "var(--foreground)",
            }}
          >
            ALL
          </button>
          <button
            onClick={() => setTimeRange("72h")}
            className="px-3 py-1 text-sm border transition-opacity hover:opacity-60"
            style={{
              borderColor: "var(--border)",
              backgroundColor: timeRange === "72h" ? "var(--accent)" : "transparent",
              color: timeRange === "72h" ? "var(--background)" : "var(--foreground)",
            }}
          >
            72H
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--secondary)"
              style={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--secondary)"
              style={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              }}
            />
            <Line 
              type="monotone" 
              dataKey={viewMode === "percentage" ? "percentage" : "amount"}
              stroke="var(--accent)" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
