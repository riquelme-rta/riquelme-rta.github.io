import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  status: z.enum(['active', 'inactive', 'prospect']).default('prospect'),
})

export const createCustomerSchema = customerSchema

export const updateCustomerSchema = customerSchema.partial()

export type Customer = z.infer<typeof customerSchema> & {
  id: string
  organizationId: string
  createdAt: Date
  updatedAt: Date
}

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>
