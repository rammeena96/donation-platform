import { NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/check-admin'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!

  const donations = await prisma.donation.findMany({
    where: { status: 'completed' },
    include: { campaign: { select: { title: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const headers = ['Receipt No', 'Date', 'Donor Name', 'Email', 'Phone', 'PAN', 'Amount', 'Payment ID', 'Campaign']

  const rows = donations.map((d: {
    receiptNumber?: string | null
    createdAt: Date
    donorName: string
    donorEmail: string
    donorPhone: string
    donorPan?: string | null
    amount: number
    paymentId?: string | null
    campaign?: { title: string } | null
  }) => [
    d.receiptNumber || '-',
    new Date(d.createdAt).toLocaleDateString('en-IN'),
    d.donorName,
    d.donorEmail,
    d.donorPhone,
    d.donorPan || '-',
    d.amount,
    d.paymentId || '-',
    d.campaign?.title || 'General',
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((v: unknown) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="donations-${Date.now()}.csv"`,
    },
  })
}
