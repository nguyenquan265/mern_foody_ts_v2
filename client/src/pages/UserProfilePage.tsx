import { useUpdateUser } from '@/apis/Api'
import UserProfileForm from '@/components/forms/UserProfileForm'

const UserProfilePage = () => {
  const { updateUser, isLoading } = useUpdateUser()

  return <UserProfileForm onSave={updateUser} isloading={isLoading} />
}

export default UserProfilePage
