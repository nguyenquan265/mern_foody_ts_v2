import { useGetUser, useUpdateUser } from '@/apis/Api'
import UserProfileForm from '@/components/forms/UserProfileForm'

const UserProfilePage = () => {
  const { user, isLoading: isGetLoading } = useGetUser()
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser()

  if (isGetLoading) {
    return <span>Loading...</span>
  }

  return <UserProfileForm onSave={updateUser} isloading={isUpdateLoading} />
}

export default UserProfilePage
