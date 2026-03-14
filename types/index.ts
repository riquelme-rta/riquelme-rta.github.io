export type User = {
  id: string
  email: string
  name: string
  avatarUrl?: string | null
  organizationId?: string | null
  role: 'admin' | 'manager' | 'user'
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export type Organization = {
  id: string
  name: string
  slug: string
  ownerId: string
  planId: string
  status: 'active' | 'suspended'
  createdAt: Date
  updatedAt: Date
}

export type Customer = {
  id: string
  organizationId: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  status: 'active' | 'inactive' | 'prospect'
  createdAt: Date
  updatedAt: Date
}

export type Plan = {
  id: string
  name: string
  slug: 'free' | 'professional' | 'enterprise'
  price: number
  billingCycle: 'monthly' | 'annual'
  features: string[]
  limits: {
    customers: number
    users: number
    storage: number
  }
}

export type Subscription = {
  id: string
  organizationId: string
  planId: string
  status: 'active' | 'cancelled' | 'overdue'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelledAt?: Date
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
  }
}
