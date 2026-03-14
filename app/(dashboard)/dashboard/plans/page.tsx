'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePlans, useCurrentSubscription } from '@/hooks/useSubscription'
import { PricingCard } from '@/components/dashboard/pricing-card'

export default function PlansPage() {
  const { plans, isLoading } = usePlans()
  const { subscription } = useCurrentSubscription()

  const handleSelectPlan = (planId: string) => {
    if (planId === 'enterprise') {
      window.location.href = 'mailto:sales@smartcliente.com?subject=Plano Enterprise'
    } else {
      // TODO: Implement Stripe checkout
      alert(`Redirecionando para checkout do plano: ${planId}`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Planos e Preços</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Escolha o plano perfeito para sua empresa. Mude a qualquer momento.
        </p>
      </div>

      {/* Usage Info */}
      {subscription && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <p className="text-sm">
              <span className="font-semibold">Seu plano atual:</span> {plans.find(p => p.id === subscription.planId)?.name}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="text-muted-foreground">Carregando planos...</p>
        ) : (
          plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={subscription?.planId === plan.id}
              onSelectPlan={handleSelectPlan}
            />
          ))
        )}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Posso mudar de plano?</h4>
            <p className="text-sm text-muted-foreground">
              Sim! Você pode fazer upgrade ou downgrade de seu plano a qualquer momento. As mudanças entram em vigor imediatamente.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Há contrato de longo prazo?</h4>
            <p className="text-sm text-muted-foreground">
              Não. Você pode cancelar seu plano a qualquer momento. Não há contratos de longo prazo ou multas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Qual é a política de reembolso?</h4>
            <p className="text-sm text-muted-foreground">
              Oferecemos uma garantia de satisfação de 14 dias. Se não estiver satisfeito, faremos um reembolso completo.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <div className="text-center py-8 border-t border-border">
        <h3 className="text-lg font-semibold mb-2">Precisa de ajuda?</h3>
        <p className="text-muted-foreground mb-4">
          Entre em contato com nosso time de vendas para customizações ou para discutir o plano Enterprise.
        </p>
        <Button variant="outline" asChild>
          <a href="mailto:sales@smartcliente.com">Contatar Vendas</a>
        </Button>
      </div>
    </div>
  )
}
