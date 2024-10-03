import { Document, Types } from 'mongoose'

export default interface IMenuItem extends Document {
  _id: Types.ObjectId
  name: string
  price: number
}
