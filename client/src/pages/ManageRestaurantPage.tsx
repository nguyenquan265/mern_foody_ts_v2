import {
  useCreateRestaurant,
  useGetRestaurant,
  useGetRestaurantOrders,
  useUpdateRestaurant
} from '@/apis/RestaurantApi'
import OrderItemCard from '@/components/OrderItemCard'
import ManageRestaurantForm from '@/components/forms/ManageRestaurantForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant()
  const { currentRestaurant, isLoading: isGetLoading } = useGetRestaurant()
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateRestaurant()
  const { orders, isLoading: isOrdersLoading } = useGetRestaurantOrders()
  const isEditting = !!currentRestaurant // neu ton tai currentRestaurant thi la edit

  if (isGetLoading || isOrdersLoading) {
    return <span>Loading...</span>
  }

  if (!currentRestaurant) {
    return <span>Unable to load user's restaurant</span>
  }

  return (
    <Tabs defaultValue='orders'>
      <TabsList>
        <TabsTrigger value='orders'>Orders</TabsTrigger>
        <TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
      </TabsList>

      <TabsContent value='orders' className='space-y-5 bg-gray-50 p-10 rounded-lg'>
        <h2 className='text-2xl font-bold'>{orders?.length} active orders</h2>

        {orders?.map((order, index) => <OrderItemCard key={index} order={order} />)}
      </TabsContent>

      <TabsContent value='manage-restaurant'>
        <ManageRestaurantForm
          restaurant={currentRestaurant}
          onSave={isEditting ? updateRestaurant : createRestaurant}
          isloading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  )
}

export default ManageRestaurantPage
