import { Express } from 'express'

declare global {
  namespace Express {
    interface Request {
      auth0Id?: string
      userId?: string
    }
  }
}
