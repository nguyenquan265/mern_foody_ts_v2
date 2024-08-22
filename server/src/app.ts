import express, { NextFunction, Request, Response } from 'express'
import router from './routes'
import errorHandler from './middlewares/error.middleware'
import cors from 'cors'
import corsOptions from './config/cors'
import ApiError from './utils/ApiError'

const app = express()

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1', router)
app.use('/*', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`))
})
app.use(errorHandler)

export default app
