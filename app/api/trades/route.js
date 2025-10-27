import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/trades
 * 获取交易记录
 * 查询参数:
 * - limit: 限制返回数量 (默认 50)
 * - offset: 偏移量 (默认 0)
 * - coinSymbol: 币种筛选 (可选)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const coinSymbol = searchParams.get('coinSymbol')

    // 构建查询条件
    const where = {}
    if (coinSymbol) {
      where.coinSymbol = coinSymbol
    }

    // 查询交易记录
    const [trades, total] = await Promise.all([
      prisma.trade.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.trade.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        trades,
        total,
        limit,
        offset,
      },
    })
  } catch (error) {
    console.error('Failed to get trades:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get trades',
      },
      { status: 500 }
    )
  }
}
