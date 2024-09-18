import { useCreateRestaurant, useGetRestaurant } from '@/apis/RestaurantApi'
import ManageRestaurantForm from '@/components/forms/ManageRestaurantForm'

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant()
  const { currentRestaurant, isLoading: isGetLoading } = useGetRestaurant()

  if (isGetLoading) {
    return <span>Loading...</span>
  }

  return <ManageRestaurantForm restaurant={currentRestaurant} onSave={createRestaurant} isloading={isCreateLoading} />
}

export default ManageRestaurantPage
