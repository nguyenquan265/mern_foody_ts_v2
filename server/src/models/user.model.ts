import { Schema, model } from 'mongoose'
import IUser from '~/interfaces/user.interface'

const userSchema = new Schema<IUser>(
  {
    auth0Id: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String
    },
    addressLine1: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
  },
  { timestamps: true }
)

const User = model<IUser>('User', userSchema)

export default User
