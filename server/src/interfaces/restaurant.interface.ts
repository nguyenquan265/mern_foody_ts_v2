import { Document, Types } from 'mongoose'

export default interface IRestaurant extends Document {
  _id: Types.ObjectId
  user: Types.ObjectId
  restaurantName: string
  city: string
  country: string
  deliveryPrice: number
  estimatedDeliveryTime: number
  cuisines: string[]
  menuItems: Types.ObjectId[]
  imageUrl: string
}
