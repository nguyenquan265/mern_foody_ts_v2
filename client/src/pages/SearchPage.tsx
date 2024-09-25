import { useSearchRestaurants } from '@/apis/RestaurantApi'
import CuisineFilter from '@/components/CuisineFilter'
import PaginationSelector from '@/components/PaginationSelector'
import SearchBar, { SearchFormData } from '@/components/SearchBar'
import SearchResultCard from '@/components/SearchResultCard'
import SearchResultInfo from '@/components/SearchResultInfo'
import SortOptionDropdown from '@/components/SortOptionDropdown'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export type SearchState = {
  searchQuery: string
  page: number
  selectedCuisines: string[]
  sortOption: string
}

const SearchPage = () => {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch'
  })
  const [isExpanded, setIsExpanded] = useState(false)
  const { result, isLoading } = useSearchRestaurants(searchState, city)

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({ ...prevState, sortOption, page: 1 }))
  }

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({ ...prevState, selectedCuisines, page: 1 }))
  }

  const setPage = (page: number) => {
    setSearchState((prevState) => ({ ...prevState, page }))
  }

  const setSearchQuerry = (formData: SearchFormData) => {
    setSearchState((prevState) => ({ ...prevState, searchQuery: formData.searchQuery, page: 1 }))
  }

  const resetSearch = () => {
    setSearchState((prevState) => ({ ...prevState, searchQuery: '', page: 1, selectedCuisines: [] }))
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!result?.data || !city) {
    return <span>No results found</span>
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list'>
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChanage={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevExpanded) => !prevExpanded)}
        />
      </div>

      <div id='main-content' className='flex flex-col gap-5'>
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuerry}
          placeholder='Search by Cuisine or Restaurant Name'
          onReset={resetSearch}
        />

        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          <SearchResultInfo total={result.pagination.total} city={city} />
          <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
        </div>

        {result?.data.map((restaurant) => <SearchResultCard key={restaurant._id} restaurant={restaurant} />)}

        <PaginationSelector page={result.pagination.page} pages={result.pagination.pages} onPageChange={setPage} />
      </div>
    </div>
  )
}

export default SearchPage
