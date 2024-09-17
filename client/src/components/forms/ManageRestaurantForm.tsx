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

type restaurantFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (restaurantData: restaurantFormData) => void // ?FormData
  isloading: boolean
}

const ManageRestaurantForm = ({ onSave, isloading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }]
    }
  })

  const onSubmit = (formDataJson: restaurantFormData) => {}

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
