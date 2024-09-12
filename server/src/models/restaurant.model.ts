import { Schema, model } from 'mongoose'
import IMenuItem from '~/interfaces/menuItem.interface'
import IRestaurant from '~/interfaces/restaurant.interface'

const menuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

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
    estimateDeliveryTime: {
      type: Number,
      required: true
    },
    cuisines: [{ type: String, required: true }],
    menuItems: [{ menuItemSchema }],
    imageUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema)

export default Restaurant
