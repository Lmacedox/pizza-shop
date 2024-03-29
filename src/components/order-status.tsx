import { twMerge } from 'tailwind-merge'

import { TypeOrderStatus } from '@/@types/order-status'

interface OrderStatusProps {
  status: TypeOrderStatus
}

interface StatusInfo {
  text: string
  statusColor: string
}

const orderStatusMap: Record<TypeOrderStatus, StatusInfo> = {
  pending: { text: 'Pendente', statusColor: 'bg-slate-400' },
  canceled: { text: 'Cancelado', statusColor: 'bg-rose-500' },
  delivered: { text: 'Entregue', statusColor: 'bg-emerald-500' },
  delivering: { text: 'Em entrega', statusColor: 'bg-amber-500' },
  processing: { text: 'Em preparo', statusColor: 'bg-amber-500' },
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={twMerge(
          'h-2 w-2 rounded-full',
          orderStatusMap[status].statusColor,
        )}
      />

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].text}
      </span>
    </div>
  )
}
