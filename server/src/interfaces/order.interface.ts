import { Document, Types } from 'mongoose'

export default interface IOrder extends Document {
  _id: Types.ObjectId
  restaurant: Types.ObjectId
  user: Types.ObjectId
  deliveryDetails: {
    email: string
    name: string
    addressLine1: string
    city: string
  }
  cartItems: {
    menuItemId: string
    name: string
    quantity: number
  }[]
  totalAmount: number
  status: {
    type: string
    enum: ['placed', 'paid', 'inProgress', 'outForDelivery', 'delivered']
  }
}
