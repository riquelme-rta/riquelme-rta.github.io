'use client'

import useSWR from 'swr'
import { subscriptionService } from '@/services/subscription.service'
import type { Plan, Subscription } from '@/lib/subscription-schemas'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function usePlans() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/plans',
    fetcher
  )

  return {
    plans: data?.data || [],
    isLoading,
    error,
    mutate,
  }
}

export function useCurrentSubscription(organizationId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    organizationId ? `/api/subscriptions/current` : null,
    fetcher
  )

  return {
    subscription: data?.data || null,
    isLoading,
    error,
    mutate,
  }
}

export function useUsage(organizationId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    organizationId ? `/api/usage` : null,
    fetcher
  )

  return {
    usage: data?.data,
    limits: data?.limits,
    withinLimits: data?.withinLimits,
    isLoading,
    error,
    mutate,
  }
}
