"use client"

import { useState } from "react"
import { RevenueChart } from "./revenue-chart"
import { CompletedTrades } from "./completed-trades"
import { ModelChat } from "./model-chat"
import { Positions } from "./positions"
import { cn } from "@/lib/utils"

export function LivePage() {
  const [activeTab, setActiveTab] = useState("trades")

  const tabs = [
    { id: "trades", label: "Completed Trades" },
    { id: "chat", label: "Model Chat" },
    { id: "positions", label: "Positions" },
  ]

  return (
    <div className="flex h-full gap-4 p-4" style={{ backgroundColor: "var(--background)" }}>
      {/* Left: Revenue Chart - 70% */}
      <div 
        className="flex-[7] border" 
        style={{ 
          backgroundColor: "var(--card)",
          borderColor: "var(--border)"
        }}
      >
        <RevenueChart />
      </div>

      {/* Right: Tabs Panel - 30% */}
      <div 
        className="flex-[3] flex flex-col border" 
        style={{ 
          backgroundColor: "var(--card)",
          borderColor: "var(--border)"
        }}
      >
        {/* Tab Headers */}
        <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 px-4 py-3 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "border-b-2"
                  : "hover:opacity-60"
              )}
              style={{
                color: activeTab === tab.id ? "var(--foreground)" : "var(--secondary)",
                borderBottomColor: activeTab === tab.id ? "var(--accent)" : "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === "trades" && <CompletedTrades />}
          {activeTab === "chat" && <ModelChat />}
          {activeTab === "positions" && <Positions />}
        </div>
      </div>
    </div>
  )
}
