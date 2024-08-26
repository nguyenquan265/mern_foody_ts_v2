import { Document, ObjectId } from 'mongoose'

export default interface IUser extends Document {
  _id: ObjectId
  auth0Id: string
  email: string
  name?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  country?: string
}
