import { Schema, model } from 'mongoose'
import IOrder from '~/interfaces/order.interface'

const orderSchema = new Schema<IOrder>(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    deliveryDetails: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true }
    },
    cartItems: [
      {
        menuItemId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true }
      }
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ['placed', 'paid', 'inProgress', 'outForDelivery', 'delivered']
    }
  },
  { timestamps: true }
)

const Order = model<IOrder>('Order', orderSchema)

export default Order
