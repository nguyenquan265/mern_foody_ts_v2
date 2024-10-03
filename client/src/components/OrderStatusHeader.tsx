import { Order } from '@/types'
import { Progress } from './ui/progress'

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

  return (
    <>
      <h1 className='text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between'>
        <span>Order Status: {order.status}</span>
        <span>Expected by: {getExpectedDeliveryTime()}</span>
      </h1>

      <Progress className='animate-pulse' value={50} />
    </>
  )
}

export default OrderStatusHeader
