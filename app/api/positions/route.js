import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/positions
 * 获取当前持仓
 */
export async function GET() {
  try {
    const positions = await prisma.position.findMany({
      orderBy: { updatedAt: 'desc' },
    })

    // 计算总盈亏
    const totalProfit = positions.reduce((sum, pos) => sum + Number(pos.unrealizedProfit), 0)
    const totalValue = positions.reduce((sum, pos) => sum + Number(pos.quantity) * Number(pos.currentPrice), 0)

    return NextResponse.json({
      success: true,
      data: {
        positions,
        summary: {
          totalPositions: positions.length,
          totalProfit,
          totalValue,
        },
      },
    })
  } catch (error) {
    console.error('Failed to get positions:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get positions',
      },
      { status: 500 }
    )
  }
}
