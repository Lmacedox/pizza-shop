import { isAfter, isBefore, isSameDay } from 'date-fns'

import { api } from '@/lib/axios'

export interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const { data } = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics-daily-receipt-in-period',
  )

  const mapperFilters = data
    .map((date) => {
      if (
        isBefore(from ?? new Date(), date.date) === true &&
        (isAfter(date.date, to ?? new Date()) === false ||
          isSameDay(date.date, to ?? new Date()))
      ) {
        return date
      }
    })
    .filter((data) => data !== undefined)

  return mapperFilters
}
