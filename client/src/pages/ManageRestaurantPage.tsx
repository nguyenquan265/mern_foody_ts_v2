import { useCreateRestaurant, useGetRestaurant, useUpdateRestaurant } from '@/apis/RestaurantApi'
import ManageRestaurantForm from '@/components/forms/ManageRestaurantForm'

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant()
  const { currentRestaurant, isLoading: isGetLoading } = useGetRestaurant()
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateRestaurant()
  const isEditting = !!currentRestaurant // neu ton tai currentRestaurant thi la edit

  if (isGetLoading) {
    return <span>Loading...</span>
  }

  return (
    <ManageRestaurantForm
      restaurant={currentRestaurant}
      onSave={isEditting ? updateRestaurant : createRestaurant}
      isloading={isCreateLoading || isUpdateLoading}
    />
  )
}

export default ManageRestaurantPage
