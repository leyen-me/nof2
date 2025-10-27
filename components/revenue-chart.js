"use client"

import { useState, useEffect, useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function RevenueChart() {
  const [timeRange, setTimeRange] = useState("all") // "all" or "72h"
  const [viewMode, setViewMode] = useState("percentage") // "percentage" or "amount"
  const [mounted, setMounted] = useState(false)

  // 使用 useMemo 生成稳定的模拟数据
  const mockData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      time: `${i * 5}m`,
      percentage: Math.sin(i * 0.5) * 10 + (i * 0.3), // 使用确定性函数
      amount: 10000 + Math.sin(i * 0.5) * 1000 + (i * 50),
    }))
  }, [])

  // 只在客户端挂载后显示
  useEffect(() => {
    setMounted(true)
  }, [])

  // 计算当前数值和变化
  const currentValue = viewMode === "percentage" 
    ? mockData[mockData.length - 1]?.percentage || 0
    : mockData[mockData.length - 1]?.amount || 0
  const isPositive = currentValue >= 0

  // 服务端渲染时显示占位符
  if (!mounted) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-sm mb-2" style={{ color: "var(--secondary)" }}>Total Revenue</div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold" style={{ color: "var(--foreground)" }}>
                  Loading...
                </span>
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--secondary)" }}>Last 24 hours</div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center" style={{ color: "var(--secondary)" }}>
          Loading chart...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with Key Metrics */}
      <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-start justify-between mb-6">
          {/* Key Metric - Visual Focal Point */}
          <div>
            <div className="text-sm mb-2" style={{ color: "var(--secondary)" }}>Total Revenue</div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold" style={{ color: "var(--foreground)" }}>
                {viewMode === "percentage" 
                  ? `${currentValue.toFixed(2)}%` 
                  : `$${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                }
              </span>
              <span 
                className="text-lg font-medium"
                style={{ color: isPositive ? "#10b981" : "#ef4444" }}
              >
                {isPositive ? "↑" : "↓"} {Math.abs(currentValue * 0.15).toFixed(2)}{viewMode === "percentage" ? "%" : ""}
              </span>
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--secondary)" }}>Last 24 hours</div>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("percentage")}
              className="px-4 py-2 text-sm font-medium rounded-md transition-all"
              style={{
                backgroundColor: viewMode === "percentage" ? "var(--accent)" : "var(--muted)",
                color: viewMode === "percentage" ? "var(--background)" : "var(--foreground)",
              }}
            >
              %
            </button>
            <button
              onClick={() => setViewMode("amount")}
              className="px-4 py-2 text-sm font-medium rounded-md transition-all"
              style={{
                backgroundColor: viewMode === "amount" ? "var(--accent)" : "var(--muted)",
                color: viewMode === "amount" ? "var(--background)" : "var(--foreground)",
              }}
            >
              $
            </button>
            <button
              onClick={() => setTimeRange("all")}
              className="px-4 py-2 text-sm font-medium rounded-md transition-all"
              style={{
                backgroundColor: timeRange === "all" ? "var(--accent)" : "var(--muted)",
                color: timeRange === "all" ? "var(--background)" : "var(--foreground)",
              }}
            >
              ALL
            </button>
            <button
              onClick={() => setTimeRange("72h")}
              className="px-4 py-2 text-sm font-medium rounded-md transition-all"
              style={{
                backgroundColor: timeRange === "72h" ? "var(--accent)" : "var(--muted)",
                color: timeRange === "72h" ? "var(--background)" : "var(--foreground)",
              }}
            >
              72H
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-6">
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
