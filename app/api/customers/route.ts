import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { customerService } from '@/services/customer.service'
import { createCustomerSchema } from '@/lib/customer-schemas'

export async function GET(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

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

    const result = await customerService.getCustomers(userData.organization_id, {
      limit,
      offset,
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createCustomerSchema.parse(body)

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

    const result = await customerService.createCustomer(
      userData.organization_id,
      validatedData
    )

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
