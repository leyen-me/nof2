"use client"

import { useEffect, useState } from "react"

export function InfoBar() {
  const [prices, setPrices] = useState({
    BTC: { price: 0, change: 0 },
    ETH: { price: 0, change: 0 },
    SOL: { price: 0, change: 0 },
    BNB: { price: 0, change: 0 },
    DOGE: { price: 0, change: 0 },
    XRP: { price: 0, change: 0 },
  })

  const [accountStats, setAccountStats] = useState({
    profitRate: 0,
    balance: 0,
  })

  // 模拟实时价格更新 (后续会替换为 WebSocket)
  useEffect(() => {
    const mockPrices = {
      BTC: { price: 43250.50, change: 2.34 },
      ETH: { price: 2280.75, change: -1.12 },
      SOL: { price: 98.23, change: 5.67 },
      BNB: { price: 312.45, change: 0.89 },
      DOGE: { price: 0.085, change: -0.45 },
      XRP: { price: 0.52, change: 1.23 },
    }
    setPrices(mockPrices)
    
    // 模拟账户数据
    setAccountStats({
      profitRate: 12.45,
      balance: 10250.75,
    })
  }, [])

  const formatPrice = (price, symbol) => {
    if (symbol === "DOGE" || symbol === "XRP") {
      return price.toFixed(4)
    }
    return price.toFixed(2)
  }

  const formatChange = (change) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(2)}%`
  }

  return (
    <div 
      className="h-10 border-b flex items-center justify-between px-4"
      style={{ 
        borderColor: "var(--border)",
        backgroundColor: "var(--muted)"
      }}
    >
      {/* Left: Coin Prices */}
      <div className="flex items-center gap-6">
        {Object.entries(prices).map(([symbol, data]) => (
          <div key={symbol} className="flex items-center gap-2">
            <span className="text-xs font-semibold" style={{ color: "var(--secondary)" }}>{symbol}</span>
            <span className="text-sm mono font-medium" style={{ color: "var(--foreground)" }}>
              ${formatPrice(data.price, symbol)}
            </span>
            <span 
              className="text-xs mono font-semibold"
              style={{ 
                color: data.change >= 0 ? "var(--profit)" : "var(--loss)" 
              }}
            >
              {formatChange(data.change)}
            </span>
          </div>
        ))}
      </div>

      {/* Right: Account Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: "var(--secondary)" }}>
            Profit Rate:
          </span>
          <span 
            className="text-sm font-semibold mono"
            style={{ 
              color: accountStats.profitRate >= 0 ? "var(--profit)" : "var(--loss)" 
            }}
          >
            {formatChange(accountStats.profitRate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: "var(--secondary)" }}>
            Balance:
          </span>
          <span className="text-sm font-semibold mono" style={{ color: "var(--foreground)" }}>
            ${accountStats.balance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
