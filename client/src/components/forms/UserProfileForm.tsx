import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import LoadingButton from '../LoadingButton'
import { Button } from '../ui/button'

const formSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1, 'name is required').max(50),
  addressLine1: z.string().min(1, 'address is required').max(255),
  city: z.string().min(1, 'city is required').max(50),
  country: z.string().min(1, 'country is required').max(50)
})

type UserFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (userProfileData: UserFormData) => void
  isloading: boolean
}

const UserProfileForm = ({ onSave, isloading }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema) // handle form validation
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className='space-y-4 bg-gray-50 rounded-lg md:p-10'>
        <div>
          <h2 className='text-2xl font-bold'>User Profile Form</h2>
          <FormDescription>View and change your profile information here!</FormDescription>
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className='bg-white' />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name='addressLine1'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Address Line 1</FormLabel>

                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>City</FormLabel>

                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Country</FormLabel>

                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isloading ? (
          <LoadingButton />
        ) : (
          <Button type='submit' className='bg-orange-500'>
            Submit
          </Button>
        )}
      </form>
    </Form>
  )
}

export default UserProfileForm
