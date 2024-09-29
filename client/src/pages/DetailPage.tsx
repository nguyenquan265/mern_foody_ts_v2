import { useGetRestaurantById } from '@/apis/RestaurantApi'
import MenuItem from '@/components/MenuItem'
import OrderSummary from '@/components/OrderSummary'
import RestaurantInfo from '@/components/RestaurantInfo'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MenuItem as MenuItemType } from '@/types'

export type CartItem = {
  _id: string
  name: string
  price: number
  quantity: number
}

const DetailPage = () => {
  const { restaurantId } = useParams()
  const { restaurant, isLoading } = useGetRestaurantById(restaurantId)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id)

      if (existingCartItem) {
        return prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      }

      return [...prevCartItems, { _id: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: 1 }]
    })
  }

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item._id !== cartItem._id)
    })
  }

  if (isLoading || !restaurant) {
    return <span>Loading...</span>
  }

  return (
    <div className='flex flex-col gap-10'>
      <AspectRatio ratio={16 / 5}>
        <img src={restaurant.imageUrl} className='rounded-md object-cover h-full w-full' />
      </AspectRatio>

      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
        <div className='flex flex-col gap-4'>
          <RestaurantInfo restaurant={restaurant} />

          <span className='text-2xl font-bold tracking-tight'>Menu</span>

          {restaurant.menuItems.map((menuItem) => (
            <MenuItem key={menuItem._id} menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
