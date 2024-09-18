import { useFormContext } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { ChangeEvent } from 'react'
import { AspectRatio } from '../ui/aspect-ratio'

const ImageSection = () => {
  const { control, watch } = useFormContext()

  const existingImage = watch('imageUrl')

  return (
    <div className='space-y-2'>
      <div>
        <h2 className='text-2xl font-bold'>Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the seatch results
        </FormDescription>
      </div>

      <div className='flex flex-col gap-8 md:w-[50%]'>
        {existingImage && (
          <AspectRatio ratio={16 / 9}>
            <img src={existingImage} className='rounded-md object-cover h-full w-full' />
          </AspectRatio>
        )}

        <FormField
          control={control}
          name='imageFile'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='bg-white'
                  type='file'
                  accept='.jpg, .jpeg, .png'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default ImageSection
