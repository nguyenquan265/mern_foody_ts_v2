import { useCreateRestaurant } from '@/apis/RestaurantApi'
import ManageRestaurantForm from '@/components/forms/ManageRestaurantForm'

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateRestaurant()

  return <ManageRestaurantForm onSave={createRestaurant} isloading={isLoading} />
}

export default ManageRestaurantPage
