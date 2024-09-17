import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type Props = {
  index: number
  removeMenuItem: () => void
}

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext()

  return (
    <div className='flex flex-row items-center gap-2'>
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='flex items-center gap-1'>
              Name <FormMessage />
            </FormLabel>

            <FormControl>
              <Input {...field} placeholder='Cheese pizza' className='bg-white' />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='flex items-center gap-1'>
              Price ($) <FormMessage />
            </FormLabel>

            <FormControl>
              <Input {...field} placeholder='8.99' className='bg-white' />
            </FormControl>
          </FormItem>
        )}
      />

      <Button type='button' onClick={removeMenuItem} className='bg-red-500 max-h-fit'>
        remove
      </Button>
    </div>
  )
}

export default MenuItemInput
