"use client"

export function CompletedTrades() {
  // 模拟交易数据
  const mockTrades = [
    { 
      id: 1, 
      time: "2025-10-27 14:30:25", 
      coin: "BTC", 
      type: "BUY", 
      price: 43250.50, 
      quantity: 0.0234, 
      profit: 125.50, 
      profitRatio: 2.34 
    },
    { 
      id: 2, 
      time: "2025-10-27 14:25:10", 
      coin: "ETH", 
      type: "SELL", 
      price: 2280.75, 
      quantity: 0.5432, 
      profit: -45.20, 
      profitRatio: -1.12 
    },
    { 
      id: 3, 
      time: "2025-10-27 14:20:45", 
      coin: "SOL", 
      type: "BUY", 
      price: 98.23, 
      quantity: 12.5, 
      profit: 85.30, 
      profitRatio: 5.67 
    },
  ]

  return (
    <div className="h-full overflow-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0" style={{ backgroundColor: "var(--background)" }}>
          <tr className="border-b" style={{ borderColor: "var(--border)" }}>
            <th className="text-left p-3" style={{ color: "var(--secondary)" }}>Time</th>
            <th className="text-left p-3" style={{ color: "var(--secondary)" }}>Coin</th>
            <th className="text-center p-3" style={{ color: "var(--secondary)" }}>Type</th>
            <th className="text-right p-3" style={{ color: "var(--secondary)" }}>Price</th>
            <th className="text-right p-3" style={{ color: "var(--secondary)" }}>Quantity</th>
            <th className="text-right p-3" style={{ color: "var(--secondary)" }}>Profit</th>
          </tr>
        </thead>
        <tbody>
          {mockTrades.map((trade) => (
            <tr key={trade.id} className="border-b" style={{ borderColor: "var(--border)" }}>
              <td className="p-3 text-xs mono" style={{ color: "var(--secondary)" }}>
                {trade.time}
              </td>
              <td className="p-3 font-medium">{trade.coin}</td>
              <td className="p-3 text-center">
                <span 
                  className="px-2 py-1 text-xs"
                  style={{ 
                    backgroundColor: trade.type === "BUY" ? "var(--profit)" : "var(--loss)",
                    color: "var(--background)"
                  }}
                >
                  {trade.type}
                </span>
              </td>
              <td className="p-3 text-right mono">${trade.price.toFixed(2)}</td>
              <td className="p-3 text-right mono">{trade.quantity.toFixed(4)}</td>
              <td className="p-3 text-right mono" style={{ 
                color: trade.profit >= 0 ? "var(--profit)" : "var(--loss)" 
              }}>
                {trade.profit >= 0 ? "+" : ""}${trade.profit.toFixed(2)} ({trade.profit >= 0 ? "+" : ""}{trade.profitRatio.toFixed(2)}%)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
