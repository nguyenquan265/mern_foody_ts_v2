import { Order } from '@/types'
import { Progress } from './ui/progress'
import { ORDER_STATUS } from '@/config/order-status-config'

type Props = {
  order: Order
}

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDeliveryTime = () => {
    const createdAt = new Date(order.createdAt)

    createdAt.setMinutes(createdAt.getMinutes() + order.restaurant.estimatedDeliveryTime)

    const hours = createdAt.getHours()
    const minutes = createdAt.getMinutes()
    const paddleMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${paddleMinutes}`
  }

  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
  }

  return (
    <>
      <h1 className='text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between'>
        <span>Order Status: {getOrderStatusInfo().label}</span>
        <span>Expected by: {getExpectedDeliveryTime()}</span>
      </h1>

      <Progress className='animate-pulse' value={getOrderStatusInfo().progressValue} />
    </>
  )
}

export default OrderStatusHeader
