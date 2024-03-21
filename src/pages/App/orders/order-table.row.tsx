import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Loader, Loader2, Search, X } from 'lucide-react'
import React, { ReactNode, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { TypeOrderStatus } from '@/@types/order-status'
import { updateOrderstatusOrder } from '@/api/change-status-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: {
    id: string
    createdAt: string
    status: TypeOrderStatus
    customerName: string
    total: number
  }
}

type OrderStatusButtonMap = Exclude<TypeOrderStatus, 'canceled' | 'delivered'>

export function OrderTableRow({
  order: { customerName, createdAt, id, status, total },
}: OrderTableRowProps) {
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(id: string, status: TypeOrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.id === id) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: updateOrderstatusOrderFn, isLoading } = useMutation({
    mutationFn: updateOrderstatusOrder,
    async onSuccess(_, { id, status }) {
      updateOrderStatusOnCache(id, status ?? 'canceled')
    },
  })

  const orderStatusButtonsMap: Record<OrderStatusButtonMap, ReactNode> = {
    pending: (
      <Button
        variant="outline"
        disabled={isLoading}
        size="xs"
        onClick={() => updateOrderstatusOrderFn({ id, status: 'processing' })}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
        ) : (
          <ArrowRight className="mr-2 h-3 w-3" />
        )}
        Aprovar
      </Button>
    ),
    delivering: (
      <Button
        variant="outline"
        disabled={isLoading}
        size="xs"
        onClick={() => updateOrderstatusOrderFn({ id, status: 'delivered' })}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
        ) : (
          <ArrowRight className="mr-2 h-3 w-3" />
        )}
        Entregue
      </Button>
    ),
    processing: (
      <Button
        variant="outline"
        disabled={isLoading}
        size="xs"
        onClick={() => updateOrderstatusOrderFn({ id, status: 'delivering' })}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
        ) : (
          <ArrowRight className="mr-2 h-3 w-3" />
        )}
        Em entrega
      </Button>
    ),
  }

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails id={id} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{id}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(createdAt), {
          addSuffix: true,
          locale: ptBR,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className="font-medium">{customerName}</TableCell>
      <TableCell className="font-medium">
        {total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {orderStatusButtonsMap[status as OrderStatusButtonMap]}
      </TableCell>
      <TableCell>
        <Button
          disabled={!['pending', 'processing'].includes(status) || isLoading}
          variant="ghost"
          size="xs"
          onClick={() => updateOrderstatusOrderFn({ id, status: 'canceled' })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
