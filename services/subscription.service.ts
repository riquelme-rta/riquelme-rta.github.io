import { supabase } from '@/lib/supabase'
import type { Plan, Subscription } from '@/lib/subscription-schemas'

export const subscriptionService = {
  async getPlans() {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('price', { ascending: true })

      if (error) throw error

      return {
        success: true,
        data: data as Plan[],
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar planos',
      }
    }
  },

  async getPlan(planId: string) {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('id', planId)
        .single()

      if (error) throw error

      return {
        success: true,
        data: data as Plan,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar plano',
      }
    }
  },

  async getOrgSubscription(organizationId: string) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      return {
        success: true,
        data: data ? (data as Subscription) : null,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar assinatura',
      }
    }
  },

  async canAccessFeature(organizationId: string, feature: 'customers' | 'users' | 'storage') {
    try {
      // Get current subscription
      const subResult = await this.getOrgSubscription(organizationId)
      if (!subResult.success || !subResult.data) {
        // Default to free plan
        const freePlan = await this.getPlan('free')
        if (!freePlan.success) return { success: false, canAccess: false }
        return { success: true, canAccess: true, limit: freePlan.data.limits[feature] }
      }

      // Get plan details
      const planResult = await this.getPlan(subResult.data.planId)
      if (!planResult.success) return { success: false, canAccess: false }

      const limit = planResult.data.limits[feature]
      const isUnlimited = limit === -1

      return {
        success: true,
        canAccess: true,
        limit: isUnlimited ? null : limit,
      }
    } catch (error) {
      return {
        success: false,
        canAccess: false,
        error: error instanceof Error ? error.message : 'Erro ao verificar acesso',
      }
    }
  },

  async getUsage(organizationId: string) {
    try {
      const { count: customers } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)

      const { count: users } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)

      return {
        success: true,
        data: {
          customers: customers || 0,
          users: users || 0,
          storage: 0, // Would need to calculate from file storage
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar uso',
      }
    }
  },

  async isWithinLimits(organizationId: string) {
    try {
      const usageResult = await this.getUsage(organizationId)
      if (!usageResult.success) return { success: false, withinLimits: false }

      const customersResult = await this.canAccessFeature(organizationId, 'customers')
      const usersResult = await this.canAccessFeature(organizationId, 'users')

      if (!customersResult.success || !usersResult.success) {
        return { success: false, withinLimits: false }
      }

      const customersOk =
        !customersResult.limit || usageResult.data.customers < customersResult.limit
      const usersOk = !usersResult.limit || usageResult.data.users < usersResult.limit

      return {
        success: true,
        withinLimits: customersOk && usersOk,
        usage: usageResult.data,
        limits: {
          customers: customersResult.limit,
          users: usersResult.limit,
        },
      }
    } catch (error) {
      return {
        success: false,
        withinLimits: false,
        error: error instanceof Error ? error.message : 'Erro ao verificar limites',
      }
    }
  },
}
