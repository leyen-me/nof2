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
    <div className="flex h-full gap-6 p-6" style={{ backgroundColor: "var(--muted)" }}>
      {/* Left: Revenue Chart - 70% */}
      <div 
        className="flex-[7] rounded-lg overflow-hidden" 
        style={{ 
          backgroundColor: "var(--background)",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
        }}
      >
        <RevenueChart />
      </div>

      {/* Right: Tabs Panel - 30% */}
      <div 
        className="flex-[3] flex flex-col rounded-lg overflow-hidden" 
        style={{ 
          backgroundColor: "var(--background)",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
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
