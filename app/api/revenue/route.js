import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/revenue
 * 获取收益历史
 * 查询参数:
 * - range: 时间范围 'all' | '72h' (默认 'all')
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || 'all'

    // 构建查询条件
    const where = {}
    if (range === '72h') {
      const past72Hours = new Date()
      past72Hours.setHours(past72Hours.getHours() - 72)
      where.snapshotTime = {
        gte: past72Hours,
      }
    }

    // 查询收益历史
    const history = await prisma.revenueHistory.findMany({
      where,
      orderBy: { snapshotTime: 'asc' },
    })

    // 计算总收益统计
    const latest = history[history.length - 1]
    const summary = latest ? {
      currentBalance: Number(latest.totalBalance),
      totalProfit: Number(latest.totalProfit),
      totalProfitRatio: Number(latest.totalProfitRatio),
      lastUpdate: latest.snapshotTime,
    } : null

    return NextResponse.json({
      success: true,
      data: {
        history,
        summary,
      },
    })
  } catch (error) {
    console.error('Failed to get revenue:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get revenue history',
      },
      { status: 500 }
    )
  }
}
