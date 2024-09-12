import { Document, ObjectId } from 'mongoose'

export default interface IMenuItem extends Document {
  _id: ObjectId
  name: string
  price: number
}
