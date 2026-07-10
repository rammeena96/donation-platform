import { NextRequest, NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/check-admin'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!

  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 20)
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''

  const where: Record<string, unknown> = {}
  if (search) {
    where.OR = [
      { donorName: { contains: search, mode: 'insensitive' } },
      { donorEmail: { contains: search, mode: 'insensitive' } },
      { donorPhone: { contains: search } },
      { orderId: { contains: search } },
      { paymentId: { contains: search } },
    ]
  }
  if (status) where.status = status

  const [donations, total] = await Promise.all([
    prisma.donation.findMany({
      where,
      include: { campaign: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.donation.count({ where }),
  ])

  return NextResponse.json({ donations, total, page, pages: Math.ceil(total / limit) })
}
