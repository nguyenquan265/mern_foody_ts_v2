import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormDescription, FormField, FormItem } from '../ui/form'
import { Button } from '../ui/button'
import MenuItemInput from './MenuItemInput'

const MenuSection = () => {
  const { control } = useFormContext()
  const {
    fields, // an array of all current menu items
    append, // a function to append a new menu item
    remove // a function to remove a menu item
  } = useFieldArray({ control, name: 'menuItems' })

  return (
    <div className='space-y-2'>
      <div>
        <h2 className='text-2xl font-bold'>Menu</h2>
        <FormDescription>Create your menu and give each item a name and a price</FormDescription>
      </div>

      <FormField
        control={control}
        name='menuItems'
        render={() => (
          <FormItem className='flex flex-col gap-2'>
            {fields.map((_, index) => (
              <MenuItemInput index={index} removeMenuItem={() => remove(index)} />
            ))}
          </FormItem>
        )}
      />

      <Button type='button' onClick={() => append({ name: '', price: '' })}>
        Add Menu Item
      </Button>
    </div>
  )
}

export default MenuSection
