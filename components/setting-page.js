"use client"

import { useState, useEffect } from "react"

export function SettingPage() {
  const [settings, setSettings] = useState({
    // Model settings
    modelPrompt: "You are an experienced cryptocurrency trading analyst...",
    modelName: "deepseek-chat",
    modelTemperature: 0.7,
    
    // Trading settings
    tradingPeriod: 5,
    selectedCoins: ["BTC", "ETH", "SOL", "BNB", "DOGE", "XRP"],
    maxTradeAmount: 1000,
    stopLossRatio: 5,
    stopProfitRatio: 10,
    
    // Account settings
    okxApiKey: "",
    okxSecretKey: "",
    okxPassphrase: "",
  })

  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    // TODO: 实现保存逻辑,调用 API
    console.log("Saving settings:", settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const allCoins = ["BTC", "ETH", "SOL", "BNB", "DOGE", "XRP"]

  const toggleCoin = (coin) => {
    setSettings(prev => ({
      ...prev,
      selectedCoins: prev.selectedCoins.includes(coin)
        ? prev.selectedCoins.filter(c => c !== coin)
        : [...prev.selectedCoins, coin]
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* Model Configuration */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium border-b pb-2" style={{ borderColor: "var(--border)" }}>
          Model Configuration
        </h2>
        
        <div className="space-y-2">
          <label className="text-sm" style={{ color: "var(--secondary)" }}>
            Model Prompt Template
          </label>
          <textarea
            value={settings.modelPrompt}
            onChange={(e) => setSettings({ ...settings, modelPrompt: e.target.value })}
            className="w-full p-3 border mono text-sm"
            style={{ 
              borderColor: "var(--border)",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
            }}
            rows={6}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm" style={{ color: "var(--secondary)" }}>
              Model Name
            </label>
            <select
              value={settings.modelName}
              onChange={(e) => setSettings({ ...settings, modelName: e.target.value })}
              className="w-full p-3 border"
              style={{ 
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)"
              }}
            >
              <option value="deepseek-chat">DeepSeek Chat</option>
              <option value="deepseek-coder">DeepSeek Coder</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm" style={{ color: "var(--secondary)" }}>
              Temperature: {settings.modelTemperature}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.modelTemperature}
              onChange={(e) => setSettings({ ...settings, modelTemperature: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Trading Configuration */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium border-b pb-2" style={{ borderColor: "var(--border)" }}>
          Trading Configuration
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm" style={{ color: "var(--secondary)" }}>
              Trading Period (minutes)
            </label>
            <select
              value={settings.tradingPeriod}
              onChange={(e) => setSettings({ ...settings, tradingPeriod: parseInt(e.target.value) })}
              className="w-full p-3 border"
              style={{ 
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)"
              }}
            >
              <option value={1}>1 minute</option>
              <option value={5}>5 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm" style={{ color: "var(--secondary)" }}>
              Max Trade Amount (USDT)
            </label>
            <input
              type="number"
              value={settings.maxTradeAmount}
              onChange={(e) => setSettings({ ...settings, maxTradeAmount: parseFloat(e.target.value) })}
              className="w-full p-3 border mono"
              style={{ 
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)"
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm" style={{ color: "var(--secondary)" }}>
            Selected Coins
          </label>
          <div className="flex gap-2">
            {allCoins.map(coin => (
              <button
                key={coin}
                onClick={() => toggleCoin(coin)}
                className="px-4 py-2 border transition-opacity hover:opacity-60"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: settings.selectedCoins.includes(coin) ? "var(--accent)" : "transparent",
                  color: settings.selectedCoins.includes(coin) ? "var(--background)" : "var(--foreground)",
                }}
              >
                {coin}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm" style={{ color: "var(--secondary)" }}>
              Stop Loss Ratio (%)
            </label>
            <input
              type="number"
              value={settings.stopLossRatio}
              onChange={(e) => setSettings({ ...settings, stopLossRatio: parseFloat(e.target.value) })}
              className="w-full p-3 border mono"
              style={{ 
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)"
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm" style={{ color: "var(--secondary)" }}>
              Stop Profit Ratio (%)
            </label>
            <input
              type="number"
              value={settings.stopProfitRatio}
              onChange={(e) => setSettings({ ...settings, stopProfitRatio: parseFloat(e.target.value) })}
              className="w-full p-3 border mono"
              style={{ 
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)"
              }}
            />
          </div>
        </div>
      </section>

      {/* Account Configuration */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium border-b pb-2" style={{ borderColor: "var(--border)" }}>
          Account Configuration
        </h2>

        <div className="space-y-2">
          <label className="text-sm" style={{ color: "var(--secondary)" }}>
            OKX API Key
          </label>
          <input
            type="password"
            value={settings.okxApiKey}
            onChange={(e) => setSettings({ ...settings, okxApiKey: e.target.value })}
            className="w-full p-3 border mono"
            style={{ 
              borderColor: "var(--border)",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
            }}
            placeholder="Enter your OKX API Key"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm" style={{ color: "var(--secondary)" }}>
            OKX Secret Key
          </label>
          <input
            type="password"
            value={settings.okxSecretKey}
            onChange={(e) => setSettings({ ...settings, okxSecretKey: e.target.value })}
            className="w-full p-3 border mono"
            style={{ 
              borderColor: "var(--border)",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
            }}
            placeholder="Enter your OKX Secret Key"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm" style={{ color: "var(--secondary)" }}>
            OKX Passphrase
          </label>
          <input
            type="password"
            value={settings.okxPassphrase}
            onChange={(e) => setSettings({ ...settings, okxPassphrase: e.target.value })}
            className="w-full p-3 border mono"
            style={{ 
              borderColor: "var(--border)",
              backgroundColor: "var(--background)",
              color: "var(--foreground)"
            }}
            placeholder="Enter your OKX Passphrase"
          />
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 font-medium transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--background)",
          }}
        >
          {saved ? "Saved ✓" : "Save Settings"}
        </button>
      </div>
    </div>
  )
}
