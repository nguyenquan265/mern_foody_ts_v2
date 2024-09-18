import { useCreateUser } from '@/apis/UserApi'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// chỉ có thể sử dụng useAuth0 ở trong children của Auth0Provider hay Auth0ProviderWithNavigate
// nên ta phải chuyển toàn bộ logic xử lý Auth0 vào AuthCallbackPage

const AuthCallbackPage = () => {
  const { user } = useAuth0()
  const { createUser } = useCreateUser()
  const navigate = useNavigate()

  const isUserCreated = useRef(false)

  useEffect(() => {
    if (user?.sub && user?.email && !isUserCreated.current) {
      createUser({
        auth0Id: user.sub,
        email: user.email
      })

      isUserCreated.current = true
    }

    navigate('/')
  }, [createUser, navigate, user])

  return <>Loading...</>
}

export default AuthCallbackPage
