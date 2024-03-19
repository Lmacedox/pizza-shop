import { twMerge } from 'tailwind-merge'

type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

interface StatusInfo {
  text: string
  statusColor: string
}

const orderStatusMap: Record<OrderStatus, StatusInfo> = {
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
