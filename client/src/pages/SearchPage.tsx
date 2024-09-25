import { useSearchRestaurants } from '@/apis/RestaurantApi'
import SearchBar, { SearchFormData } from '@/components/SearchBar'
import SearchResultCard from '@/components/SearchResultCard'
import SearchResultInfo from '@/components/SearchResultInfo'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export type SearchState = {
  searchQuery: string
}

const SearchPage = () => {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({ searchQuery: '' })
  const { result, isLoading } = useSearchRestaurants(searchState, city)

  const setSearchQuerry = (formData: SearchFormData) => {
    setSearchState((prevState) => ({ ...prevState, searchQuery: formData.searchQuery }))
  }

  const resetSearch = () => {
    setSearchState((prevState) => ({ ...prevState, searchQuery: '' }))
  }

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
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuerry}
          placeholder='Search by Cuisine or Restaurant Name'
          onReset={resetSearch}
        />

        <SearchResultInfo total={result.pagination.total} city={city} />

        {result?.data.map((restaurant) => <SearchResultCard key={restaurant._id} restaurant={restaurant} />)}
      </div>
    </div>
  )
}

export default SearchPage
