import { NextRequest, NextResponse } from 'next/server'
import { subscriptionService } from '@/services/subscription.service'

export async function GET() {
  try {
    const result = await subscriptionService.getPlans()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
