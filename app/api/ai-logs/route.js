import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/ai-logs
 * 获取 AI 分析日志
 * 查询参数:
 * - limit: 限制返回数量 (默认 30)
 * - offset: 偏移量 (默认 0)
 * - coinSymbol: 币种筛选 (可选)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '30')
    const offset = parseInt(searchParams.get('offset') || '0')
    const coinSymbol = searchParams.get('coinSymbol')

    // 构建查询条件
    const where = {}
    if (coinSymbol) {
      where.coinSymbol = coinSymbol
    }

    // 查询 AI 分析日志
    const [logs, total] = await Promise.all([
      prisma.aiAnalysisLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.aiAnalysisLog.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        logs,
        total,
        limit,
        offset,
      },
    })
  } catch (error) {
    console.error('Failed to get AI logs:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get AI logs',
      },
      { status: 500 }
    )
  }
}
