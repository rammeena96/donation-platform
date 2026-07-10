import { NextRequest, NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/check-admin'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!
  const settings = await prisma.setting.findMany()
  const obj: Record<string, string> = {}
  settings.forEach((s: { key: string; value: string }) => { obj[s.key] = s.value })
  return NextResponse.json(obj)
}

export async function POST(req: NextRequest) {
  const { authorized, response } = await checkAdmin()
  if (!authorized) return response!
  const data = await req.json()
  for (const [key, value] of Object.entries(data)) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    })
  }
  return NextResponse.json({ success: true })
}
