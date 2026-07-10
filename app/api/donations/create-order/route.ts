import { NextRequest, NextResponse } from 'next/server'
import { getRazorpayInstance } from '@/lib/razorpay'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  amount: z.number().min(1),
  donorName: z.string().min(2),
  donorEmail: z.string().email(),
  donorPhone: z.string().min(10),
  donorPan: z.string().optional(),
  donorAddress: z.string().optional(),
  campaignId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const razorpay = getRazorpayInstance()
    const order = await razorpay.orders.create({
      amount: data.amount * 100,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    })
    await prisma.donation.create({
      data: {
        orderId: order.id,
        amount: data.amount,
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        donorPhone: data.donorPhone,
        donorPan: data.donorPan || null,
        donorAddress: data.donorAddress || null,
        campaignId: data.campaignId || null,
        status: 'pending',
      },
    })
    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
