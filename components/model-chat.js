"use client"

export function ModelChat() {
  // 模拟 AI 分析日志
  const mockLogs = [
    {
      id: 1,
      time: "2025-10-27 14:30:00",
      coin: "BTC",
      decision: "BUY",
      content: "Based on current market analysis: MACD shows bullish crossover, RSI at 45 (neutral zone), volume increased by 23%. Technical indicators suggest upward momentum. Confidence: 78%",
    },
    {
      id: 2,
      time: "2025-10-27 14:25:00",
      coin: "ETH",
      decision: "SELL",
      content: "Market signals indicate potential reversal: MACD bearish divergence, RSI at 68 (approaching overbought), decreasing volume. Recommend taking profit. Confidence: 65%",
    },
    {
      id: 3,
      time: "2025-10-27 14:20:00",
      coin: "SOL",
      decision: "HOLD",
      content: "Neutral market conditions: MACD flat, RSI at 52, volume stable. No clear directional bias detected. Waiting for stronger signals. Confidence: 72%",
    },
  ]

  const getDecisionColor = (decision) => {
    switch (decision) {
      case "BUY":
        return "var(--profit)"
      case "SELL":
        return "var(--loss)"
      default:
        return "var(--secondary)"
    }
  }

  return (
    <div className="h-full overflow-auto p-4 flex flex-col gap-4">
      {mockLogs.map((log) => (
        <div 
          key={log.id} 
          className="border p-3 flex flex-col gap-2"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs mono" style={{ color: "var(--secondary)" }}>
              {log.time}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{log.coin}</span>
              <span 
                className="px-2 py-0.5 text-xs font-medium"
                style={{ 
                  backgroundColor: getDecisionColor(log.decision),
                  color: "var(--background)"
                }}
              >
                {log.decision}
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
            {log.content}
          </p>
        </div>
      ))}
    </div>
  )
}
