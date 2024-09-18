import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import DetailsSection from './DetailsSection'
import { Separator } from '../ui/separator'
import CuisinesSection from './CuisinesSection'
import MenuSection from './MenuSection'
import ImageSection from './ImageSection'
import LoadingButton from '../LoadingButton'
import { Button } from '../ui/button'
import { Restaurant } from '@/types'
import { useEffect } from 'react'

const formSchema = z.object({
  restaurantName: z.string({ required_error: 'Restaurant name is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
  deliveryPrice: z.coerce.number({
    required_error: 'Delivery price is required',
    invalid_type_error: 'Delivery price must be a number'
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: 'Estimated delivery time is required',
    invalid_type_error: 'Estimated delivery time must be a number'
  }),
  cuisines: z.array(z.string()).nonempty({ message: 'Cuisines are required' }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, { message: 'Name is required' }),
      price: z.coerce.number().min(1, { message: 'Price must be greater than 0' })
    })
  ),
  imageFile: z.instanceof(File, { message: 'Image is required' })
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
  restaurant?: Restaurant
  onSave: (restaurantData: FormData) => void // ?FormData
  isloading: boolean
}

const ManageRestaurantForm = ({ onSave, isloading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }]
    }
  })

  useEffect(() => {
    if (!restaurant) {
      return
    }

    const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2))

    const menuItemsFormatted = restaurant.menuItems.map((menuItem) => ({
      ...menuItem,
      price: parseInt((menuItem.price / 100).toFixed(2))
    }))

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted
    }

    form.reset(updatedRestaurant)
  }, [restaurant, form])

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData()

    formData.append('restaurantName', formDataJson.restaurantName)
    formData.append('city', formDataJson.city)
    formData.append('country', formDataJson.country)
    formData.append('deliveryPrice', (formDataJson.deliveryPrice * 100).toString())
    formData.append('estimatedDeliveryTime', formDataJson.estimatedDeliveryTime.toString())
    formDataJson.cuisines.map((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine)
    })
    formDataJson.menuItems.map((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name)
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
    })
    formData.append('imageFile', formDataJson.imageFile)

    onSave(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-lg'>
        <DetailsSection />

        <Separator />

        <CuisinesSection />

        <Separator />

        <MenuSection />

        <Separator />

        <ImageSection />

        {isloading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  )
}

export default ManageRestaurantForm
