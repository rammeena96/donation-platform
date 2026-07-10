import { NextRequest, NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/check-admin'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!
  const { id } = await params
  const data = await req.json()
  const campaign = await prisma.campaign.update({ where: { id }, data })
  return NextResponse.json(campaign)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!
  const { id } = await params
  await prisma.campaign.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
