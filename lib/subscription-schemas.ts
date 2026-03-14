import { z } from 'zod'

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.enum(['free', 'professional', 'enterprise']),
  price: z.number(),
  billingCycle: z.enum(['monthly', 'annual']),
  features: z.array(z.string()),
  limits: z.object({
    customers: z.number(),
    users: z.number(),
    storage: z.number(),
  }),
})

export const subscriptionSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  planId: z.string(),
  status: z.enum(['active', 'cancelled', 'overdue']),
  currentPeriodStart: z.date(),
  currentPeriodEnd: z.date(),
  cancelledAt: z.date().nullable().optional(),
  stripeSubscriptionId: z.string().nullable().optional(),
  stripeCustomerId: z.string().nullable().optional(),
})

export const createSubscriptionSchema = z.object({
  planId: z.string(),
  billingCycle: z.enum(['monthly', 'annual']),
})

export type Plan = z.infer<typeof planSchema>
export type Subscription = z.infer<typeof subscriptionSchema>
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>
