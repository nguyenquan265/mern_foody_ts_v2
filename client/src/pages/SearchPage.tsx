import { useSearchRestaurants } from '@/apis/RestaurantApi'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
  const { city } = useParams()
  const { result, isLoading } = useSearchRestaurants(city)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (result?.data || !city) {
    return <span>No results found</span>
  }

  return <div className=''></div>
}

export default SearchPage
