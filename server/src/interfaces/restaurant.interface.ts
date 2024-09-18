import { Document, Types } from 'mongoose'

type MenuItem = {
  name: string
  price: number
}

export default interface IRestaurant extends Document {
  _id: Types.ObjectId
  user: Types.ObjectId
  restaurantName: string
  city: string
  country: string
  deliveryPrice: number
  estimatedDeliveryTime: number
  cuisines: string[]
  menuItems: MenuItem[]
  imageUrl: string
}
