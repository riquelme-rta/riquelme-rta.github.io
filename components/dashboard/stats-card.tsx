'use client'

import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
        {trend && (
          <div className="flex items-center gap-2 mt-4">
            <span
              className={`text-xs font-semibold ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.direction === 'up' ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground">vs período anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
