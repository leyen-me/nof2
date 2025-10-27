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
      <div 
        className="p-8 border-b" 
        style={{ 
          borderColor: "var(--border)",
          background: "linear-gradient(to bottom, var(--muted) 0%, var(--card) 100%)"
        }}
      >
        <div className="flex items-end justify-between">
          {/* Key Metric - Visual Focal Point */}
          <div>
            <div className="text-xs font-medium mb-3 tracking-wide" style={{ color: "var(--secondary)" }}>
              TOTAL REVENUE
            </div>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-6xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
                {viewMode === "percentage" 
                  ? `${currentValue.toFixed(2)}%` 
                  : `$${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                }
              </span>
              <span 
                className="text-xl font-semibold"
                style={{ color: isPositive ? "var(--profit)" : "var(--loss)" }}
              >
                {isPositive ? "↑" : "↓"} {Math.abs(currentValue * 0.15).toFixed(2)}{viewMode === "percentage" ? "%" : ""}
              </span>
            </div>
            <div className="text-xs" style={{ color: "var(--secondary)" }}>
              vs last 24 hours
            </div>
          </div>
          
          {/* Controls - Segmented Control Style */}
          <div className="flex flex-col gap-3">
            {/* View Mode Toggle */}
            <div 
              className="flex p-1 gap-1" 
              style={{ 
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)"
              }}
            >
              <button
                onClick={() => setViewMode("percentage")}
                className="px-4 py-1.5 text-xs font-semibold transition-all"
                style={{
                  backgroundColor: viewMode === "percentage" ? "var(--card)" : "transparent",
                  color: viewMode === "percentage" ? "var(--foreground)" : "var(--secondary)",
                  boxShadow: viewMode === "percentage" ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none"
                }}
              >
                PERCENTAGE
              </button>
              <button
                onClick={() => setViewMode("amount")}
                className="px-4 py-1.5 text-xs font-semibold transition-all"
                style={{
                  backgroundColor: viewMode === "amount" ? "var(--card)" : "transparent",
                  color: viewMode === "amount" ? "var(--foreground)" : "var(--secondary)",
                  boxShadow: viewMode === "amount" ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none"
                }}
              >
                AMOUNT
              </button>
            </div>
            
            {/* Time Range Toggle */}
            <div 
              className="flex p-1 gap-1" 
              style={{ 
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)"
              }}
            >
              <button
                onClick={() => setTimeRange("all")}
                className="px-4 py-1.5 text-xs font-semibold transition-all"
                style={{
                  backgroundColor: timeRange === "all" ? "var(--card)" : "transparent",
                  color: timeRange === "all" ? "var(--foreground)" : "var(--secondary)",
                  boxShadow: timeRange === "all" ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none"
                }}
              >
                ALL TIME
              </button>
              <button
                onClick={() => setTimeRange("72h")}
                className="px-4 py-1.5 text-xs font-semibold transition-all"
                style={{
                  backgroundColor: timeRange === "72h" ? "var(--card)" : "transparent",
                  color: timeRange === "72h" ? "var(--foreground)" : "var(--secondary)",
                  boxShadow: timeRange === "72h" ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none"
                }}
              >
                72 HOURS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-6 relative">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ 
            backgroundImage: `radial-gradient(circle at 15px 15px, var(--border) 1px, transparent 0)`,
            backgroundSize: "30px 30px"
          }}
        />
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
