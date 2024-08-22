import mongoose from 'mongoose'
import env from './config/env'
import app from './app'

mongoose
  .connect(env.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB')

    app.listen(env.port, () => {
      console.log(`Server is running on http://localhost:${env.port}`)
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
