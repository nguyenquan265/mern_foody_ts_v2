import { v2 } from 'cloudinary'
import env from './env'

const cloudinary = v2

cloudinary.config({
  cloud_name: env.cloudinaryName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret
})

export default cloudinary
