import { supabase } from '@/lib/supabase'
import type { CreateCustomerInput, UpdateCustomerInput, Customer } from '@/lib/customer-schemas'
import { Database } from '@/types/database'

type CustomerRow = Database['public']['Tables']['customers']['Row']

export const customerService = {
  async getCustomers(organizationId: string, { limit = 50, offset = 0 } = {}) {
    try {
      const { data, error, count } = await supabase
        .from('customers')
        .select('*', { count: 'exact' })
        .eq('organization_id', organizationId)
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false })

      if (error) throw error

      return {
        success: true,
        data: data as Customer[],
        pagination: {
          limit,
          offset,
          total: count || 0,
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar clientes',
      }
    }
  },

  async getCustomer(id: string) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return {
        success: true,
        data: data as Customer,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar cliente',
      }
    }
  },

  async createCustomer(organizationId: string, input: CreateCustomerInput) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert({
          organization_id: organizationId,
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          company: input.company || null,
          status: input.status || 'prospect',
        })
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        data: data as Customer,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar cliente',
      }
    }
  },

  async updateCustomer(id: string, input: UpdateCustomerInput) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update({
          ...(input.name && { name: input.name }),
          ...(input.email && { email: input.email }),
          ...(input.phone !== undefined && { phone: input.phone }),
          ...(input.company !== undefined && { company: input.company }),
          ...(input.status && { status: input.status }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        data: data as Customer,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar cliente',
      }
    }
  },

  async deleteCustomer(id: string) {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao deletar cliente',
      }
    }
  },

  async getStats(organizationId: string) {
    try {
      const { count: totalCustomers } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)

      const { count: activeCustomers } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)
        .eq('status', 'active')

      return {
        success: true,
        data: {
          totalCustomers: totalCustomers || 0,
          activeCustomers: activeCustomers || 0,
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar estatísticas',
      }
    }
  },
}
