import { NextRequest, NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/check-admin'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function GET() {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!
  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ campaigns })
}

export async function POST(req: NextRequest) {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!
  const body = await req.json()
  const { title, description, imageUrl, videoUrl, goalAmount, category, isFeatured, isActive, slug } = body
  if (!title || !description) return NextResponse.json({ error: 'Title and description required' }, { status: 400 })
  const campaign = await prisma.campaign.create({
    data: {
      slug: slug || slugify(title),
      title, description,
      imageUrl: imageUrl || null,
      videoUrl: videoUrl || null,
      goalAmount: goalAmount ? Number(goalAmount) : null,
      category: category || 'general',
      isFeatured: !!isFeatured,
      isActive: isActive !== false,
    },
  })
  return NextResponse.json({ campaign })
}

export async function PUT(req: NextRequest) {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  const body = await req.json()
  const campaign = await prisma.campaign.update({
    where: { id },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.description && { description: body.description }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl || null }),
      ...(body.videoUrl !== undefined && { videoUrl: body.videoUrl || null }),
      ...(body.goalAmount !== undefined && { goalAmount: body.goalAmount ? Number(body.goalAmount) : null }),
      ...(body.category && { category: body.category }),
      ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
    },
  })
  return NextResponse.json({ campaign })
}

export async function DELETE(req: NextRequest) {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await prisma.campaign.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
