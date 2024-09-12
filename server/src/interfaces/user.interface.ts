import { Document, Types } from 'mongoose'

export default interface IUser extends Document {
  _id: Types.ObjectId
  auth0Id: string
  email: string
  name?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  country?: string
}
