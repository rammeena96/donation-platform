import { NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/check-admin'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [totalDonations, totalDonors, todayDonations, campaigns] = await Promise.all([
    prisma.donation.aggregate({ where: { status: 'completed' }, _sum: { amount: true }, _count: true }),
    prisma.donation.groupBy({ by: ['donorEmail'], where: { status: 'completed' } }),
    prisma.donation.aggregate({ where: { status: 'completed', createdAt: { gte: today } }, _sum: { amount: true }, _count: true }),
    prisma.campaign.count({ where: { isActive: true } }),
  ])

  return NextResponse.json({
    totalAmount: totalDonations._sum.amount || 0,
    totalCount: totalDonations._count,
    totalDonors: totalDonors.length,
    todayAmount: todayDonations._sum.amount || 0,
    todayCount: todayDonations._count,
    activeCampaigns: campaigns,
  })
}
