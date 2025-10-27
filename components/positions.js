"use client"

export function Positions() {
  // 模拟持仓数据
  const mockPositions = [
    {
      id: 1,
      coin: "BTC",
      multiplier: 1,
      quantity: 0.0234,
      avgCost: 42800.50,
      currentPrice: 43250.50,
      profit: 10.53,
      profitRatio: 1.05,
    },
    {
      id: 2,
      coin: "ETH",
      multiplier: 1,
      quantity: 0.5432,
      avgCost: 2305.30,
      currentPrice: 2280.75,
      profit: -13.34,
      profitRatio: -1.06,
    },
    {
      id: 3,
      coin: "SOL",
      multiplier: 1,
      quantity: 12.5,
      avgCost: 93.20,
      currentPrice: 98.23,
      profit: 62.88,
      profitRatio: 5.40,
    },
  ]

  return (
    <div className="h-full overflow-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0" style={{ backgroundColor: "var(--background)" }}>
          <tr className="border-b" style={{ borderColor: "var(--border)" }}>
            <th className="text-left p-3" style={{ color: "var(--secondary)" }}>Coin</th>
            <th className="text-center p-3" style={{ color: "var(--secondary)" }}>Multiplier</th>
            <th className="text-right p-3" style={{ color: "var(--secondary)" }}>Quantity</th>
            <th className="text-right p-3" style={{ color: "var(--secondary)" }}>Avg Cost</th>
            <th className="text-right p-3" style={{ color: "var(--secondary)" }}>Current</th>
            <th className="text-right p-3" style={{ color: "var(--secondary)" }}>Profit</th>
          </tr>
        </thead>
        <tbody>
          {mockPositions.map((position) => (
            <tr key={position.id} className="border-b" style={{ borderColor: "var(--border)" }}>
              <td className="p-3 font-medium">{position.coin}</td>
              <td className="p-3 text-center mono">{position.multiplier}</td>
              <td className="p-3 text-right mono">{position.quantity.toFixed(4)}</td>
              <td className="p-3 text-right mono">${position.avgCost.toFixed(2)}</td>
              <td className="p-3 text-right mono">${position.currentPrice.toFixed(2)}</td>
              <td className="p-3 text-right mono" style={{ 
                color: position.profit >= 0 ? "var(--profit)" : "var(--loss)" 
              }}>
                {position.profit >= 0 ? "+" : ""}{position.profitRatio.toFixed(2)}% (${position.profit.toFixed(2)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
