import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { subscriptionService } from '@/services/subscription.service'

export async function GET() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('id', user.id)
      .single()

    if (!userData?.organization_id) {
      return NextResponse.json(
        { success: false, error: 'Organização não encontrada' },
        { status: 400 }
      )
    }

    const result = await subscriptionService.getOrgSubscription(userData.organization_id)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
