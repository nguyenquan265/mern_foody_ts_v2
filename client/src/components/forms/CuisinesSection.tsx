import { useFormContext } from 'react-hook-form'
import { FormDescription, FormField, FormItem, FormMessage } from '../ui/form'
import CuisineCheckbox from './CuisineCheckbox'

const cuisineList = [
  'American',
  'BBQ',
  'Breakfast',
  'Burgers',
  'Cafe',
  'Chinese',
  'Desserts',
  'French',
  'Greek',
  'Healthy',
  'Indian',
  'Italian',
  'Japanese',
  'Mexican',
  'Noodles',
  'Organic',
  'Pasta',
  'Pizza',
  'Salads',
  'Seafood',
  'Spanish',
  'Steak',
  'Sushi',
  'Tacos',
  'Tapas',
  'Vegan'
]

const CuisinesSection = () => {
  const { control } = useFormContext()

  return (
    <div className='space-y-2'>
      <div>
        <h2 className='text-2xl font-bold'>Cuisines</h2>
        <FormDescription>Select the cuisines that your restaurant serves</FormDescription>
      </div>

      <FormField
        control={control}
        name='cuisines'
        render={({ field }) => (
          <FormItem>
            <div className='grid md:grid-cols-5 gap-1'>
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckbox cuisine={cuisineItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default CuisinesSection
