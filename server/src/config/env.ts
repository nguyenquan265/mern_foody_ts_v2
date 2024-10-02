import 'dotenv/config'

const env = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI!,
  nodeEnv: process.env.NODE_ENV || 'development',
  auth0Audience: process.env.AUTH0_AUDIENCE!,
  auth0IssuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL!,
  cloudinaryName: process.env.CLOUDINARY_NAME!,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY!,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET!,
  stripeApiKey: process.env.STRIPE_API_KEY!,
  frontendUrl: process.env.FRONTEND_URL!
}

export default env
