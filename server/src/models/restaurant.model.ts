import { Schema, model } from 'mongoose'
import IRestaurant from '~/interfaces/restaurant.interface'
import { menuItemSchema } from './menuItem.model'

const restaurantSchema = new Schema<IRestaurant>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    restaurantName: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    deliveryPrice: {
      type: Number,
      required: true
    },
    estimatedDeliveryTime: {
      type: Number,
      required: true
    },
    cuisines: [{ type: String, required: true }],
    menuItems: [menuItemSchema],
    imageUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema)

export default Restaurant
