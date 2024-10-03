import { useGetOrders } from '@/apis/OrderApi'
import OrderStatusHeader from '@/components/OrderStatusHeader'

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetOrders()

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!orders || orders.length === 0) {
    return <span>No orders found</span>
  }

  return (
    <div className='space-y-10'>
      {orders.map((order) => (
        <div key={order._id} className='space-y-10 bg-gray-50 p-10 rounded-lg'>
          <OrderStatusHeader order={order} />
        </div>
      ))}
    </div>
  )
}

export default OrderStatusPage
