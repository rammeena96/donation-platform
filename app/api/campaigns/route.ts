import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const campaigns = await prisma.campaign.findMany({
      where: {
        isActive: true,
        ...(category ? { category } : {}),
        ...(featured ? { isFeatured: true } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ campaigns })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
