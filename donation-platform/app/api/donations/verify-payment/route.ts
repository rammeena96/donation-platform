import { NextRequest, NextResponse } from 'next/server'
import { verifyPaymentSignature } from '@/lib/razorpay'
import { prisma } from '@/lib/prisma'
import { sendReceiptEmail } from '@/lib/email'
import { generateReceiptNumber } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await req.json()
    const isValid = verifyPaymentSignature(orderId, paymentId, signature)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
    const receiptNumber = generateReceiptNumber()
    const donation = await prisma.donation.update({
      where: { orderId },
      data: { paymentId, signature, status: 'completed', receiptNumber },
      include: { campaign: true },
    })
    if (donation.campaign) {
      await prisma.campaign.update({
        where: { id: donation.campaignId! },
        data: { raisedAmount: { increment: donation.amount } },
      })
    }
    await prisma.receipt.create({
      data: {
        receiptNo: receiptNumber,
        donationId: donation.id,
        donorName: donation.donorName,
        donorEmail: donation.donorEmail,
        amount: donation.amount,
        campaignName: donation.campaign?.title,
      },
    })
    try {
      await sendReceiptEmail({
        to: donation.donorEmail,
        name: donation.donorName,
        amount: donation.amount,
        receiptNumber,
        campaignName: donation.campaign?.title,
        paymentId,
      })
    } catch (emailErr) {
      console.error('Email send failed:', emailErr)
    }
    return NextResponse.json({ success: true, receiptNumber, donationId: donation.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
