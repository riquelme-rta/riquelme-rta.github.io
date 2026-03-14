'use client'

import useSWR from 'swr'
import { useState } from 'react'
import type { Customer, CreateCustomerInput, UpdateCustomerInput } from '@/lib/customer-schemas'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useCustomers(page = 1, limit = 50) {
  const offset = (page - 1) * limit
  const { data, error, isLoading, mutate } = useSWR(
    `/api/customers?limit=${limit}&offset=${offset}`,
    fetcher
  )

  return {
    customers: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
  }
}

export function useCreateCustomer() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async (data: CreateCustomerInput) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Erro ao criar cliente')
        return null
      }

      return result.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar cliente'
      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { create, isLoading, error }
}

export function useUpdateCustomer() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = async (id: string, data: UpdateCustomerInput) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Erro ao atualizar cliente')
        return null
      }

      return result.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao atualizar cliente'
      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { update, isLoading, error }
}

export function useDeleteCustomer() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const delete_ = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Erro ao deletar cliente')
        return false
      }

      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao deletar cliente'
      setError(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { delete: delete_, isLoading, error }
}
