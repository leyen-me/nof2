import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { encrypt, decrypt } from '@/lib/crypto'

/**
 * GET /api/settings
 * 获取用户配置
 */
export async function GET() {
  try {
    // 获取第一个用户配置(单用户系统)
    let settings = await prisma.userSettings.findFirst()

    // 如果没有配置,创建默认配置
    if (!settings) {
      settings = await prisma.userSettings.create({
        data: {
          tradingPeriod: 5,
          selectedCoins: ['BTC', 'ETH', 'SOL', 'BNB', 'DOGE', 'XRP'],
          modelPrompt: 'You are an experienced cryptocurrency trading analyst. Analyze the market data and provide trading recommendations.',
          modelName: 'deepseek-chat',
          modelTemperature: 0.7,
          maxTradeAmount: 1000,
          stopLossRatio: 0.05,
          stopProfitRatio: 0.10,
        },
      })
    }

    // 解密敏感信息
    const response = {
      ...settings,
      okxApiKey: settings.okxApiKey ? decrypt(settings.okxApiKey) : '',
      okxSecretKey: settings.okxSecretKey ? decrypt(settings.okxSecretKey) : '',
      okxPassphrase: settings.okxPassphrase ? decrypt(settings.okxPassphrase) : '',
    }

    return NextResponse.json({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error('Failed to get settings:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get settings',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/settings
 * 更新用户配置
 */
export async function POST(request) {
  try {
    const body = await request.json()

    // 加密敏感信息
    const encryptedData = {
      tradingPeriod: body.tradingPeriod,
      selectedCoins: body.selectedCoins,
      modelPrompt: body.modelPrompt,
      modelName: body.modelName,
      modelTemperature: body.modelTemperature,
      maxTradeAmount: body.maxTradeAmount,
      stopLossRatio: body.stopLossRatio,
      stopProfitRatio: body.stopProfitRatio,
      okxApiKey: body.okxApiKey ? encrypt(body.okxApiKey) : null,
      okxSecretKey: body.okxSecretKey ? encrypt(body.okxSecretKey) : null,
      okxPassphrase: body.okxPassphrase ? encrypt(body.okxPassphrase) : null,
    }

    // 查找现有配置
    const existing = await prisma.userSettings.findFirst()

    let settings
    if (existing) {
      // 更新现有配置
      settings = await prisma.userSettings.update({
        where: { id: existing.id },
        data: encryptedData,
      })
    } else {
      // 创建新配置
      settings = await prisma.userSettings.create({
        data: encryptedData,
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: settings.id,
        message: 'Settings saved successfully',
      },
    })
  } catch (error) {
    console.error('Failed to save settings:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save settings',
      },
      { status: 500 }
    )
  }
}
