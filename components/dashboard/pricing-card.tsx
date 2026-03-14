'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import type { Plan } from '@/lib/subscription-schemas'

interface PricingCardProps {
  plan: Plan
  isCurrentPlan?: boolean
  onSelectPlan?: (planId: string) => void
}

export function PricingCard({
  plan,
  isCurrentPlan,
  onSelectPlan,
}: PricingCardProps) {
  const isEnterprise = plan.slug === 'enterprise'

  return (
    <Card
      className={`relative flex flex-col h-full transition-all ${
        isCurrentPlan
          ? 'border-primary shadow-lg'
          : 'border-border hover:shadow-md'
      }`}
    >
      {isCurrentPlan && (
        <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
          Plano Atual
        </div>
      )}

      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>
          {plan.slug === 'free'
            ? 'Para começar'
            : plan.slug === 'professional'
            ? 'Para pequenas empresas'
            : 'Para grandes empresas'}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Price */}
          <div className="space-y-1">
            {isEnterprise ? (
              <p className="text-3xl font-bold">Customizado</p>
            ) : (
              <>
                <p className="text-3xl font-bold">
                  {plan.price === 0 ? 'Gratuito' : `R$ ${plan.price}`}
                </p>
                {plan.price > 0 && (
                  <p className="text-sm text-muted-foreground">
                    por mês (cobrado anualmente)
                  </p>
                )}
              </>
            )}
          </div>

          {/* Features */}
          <div className="space-y-3">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Limits */}
          {plan.limits.customers > 0 && (
            <div className="pt-4 border-t border-border space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Limites</p>
              <div className="space-y-1 text-xs">
                <p>
                  Clientes:{' '}
                  {plan.limits.customers === -1
                    ? 'Ilimitados'
                    : `até ${plan.limits.customers.toLocaleString()}`}
                </p>
                <p>
                  Usuários:{' '}
                  {plan.limits.users === -1
                    ? 'Ilimitados'
                    : `até ${plan.limits.users}`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="pt-4 mt-4">
          <Button
            onClick={() => onSelectPlan?.(plan.id)}
            disabled={isCurrentPlan}
            className="w-full"
            variant={isCurrentPlan ? 'secondary' : 'default'}
          >
            {isCurrentPlan
              ? 'Plano Atual'
              : isEnterprise
              ? 'Contatar Vendas'
              : 'Selecionar Plano'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
