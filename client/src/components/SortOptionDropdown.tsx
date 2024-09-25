import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

type Props = {
  onChange: (value: string) => void
  sortOption: string
}

const SORT_OPTIONS = [
  {
    label: 'Best Match',
    value: 'bestMatch'
  },
  {
    label: 'Delivery price',
    value: 'deliveryPrice'
  },
  {
    label: 'Estimated delivery time',
    value: 'estimatedDeliveryTime'
  }
]

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  const selectedSortOptionLabel = SORT_OPTIONS.find((option) => option.value === sortOption)?.label || 'Best Match'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer'>
        <Button variant='outline' className='w-full'>
          Sort by: {selectedSortOptionLabel}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem className='cursor-pointer' onClick={() => onChange(option.value)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortOptionDropdown
