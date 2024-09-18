import { useGetUser, useUpdateUser } from '@/apis/UserApi'
import UserProfileForm from '@/components/forms/UserProfileForm'

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetUser()
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser()

  if (isGetLoading) {
    return <span>Loading...</span>
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>
  }

  return <UserProfileForm currentUser={currentUser} onSave={updateUser} isloading={isUpdateLoading} />
}

export default UserProfilePage
