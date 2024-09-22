import { useSearchRestaurants } from '@/apis/RestaurantApi'
import SearchResultCard from '@/components/SearchResultCard'
import SearchResultInfo from '@/components/SearchResultInfo'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
  const { city } = useParams()
  const { result, isLoading } = useSearchRestaurants(city)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!result?.data || !city) {
    return <span>No results found</span>
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list'>insert cuisines list here</div>

      <div id='main-content' className='flex flex-col gap-5'>
        <SearchResultInfo total={result?.pagination.total || 0} city={city} />

        {result?.data.map((restaurant) => <SearchResultCard key={restaurant._id} restaurant={restaurant} />)}
      </div>
    </div>
  )
}

export default SearchPage
