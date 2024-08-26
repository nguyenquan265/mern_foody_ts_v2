import { NextFunction, Request, RequestHandler, Response } from 'express'
import { auth } from 'express-oauth2-jwt-bearer'
import { JwtPayload, decode } from 'jsonwebtoken'
import env from '~/config/env'
import User from '~/models/user.model'
import ApiError from '~/utils/ApiError'
import asyncHandler from '~/utils/asyncHandler'

export const jwtCheck = auth({
  audience: env.auth0Audience,
  issuerBaseURL: env.auth0IssuerBaseUrl,
  tokenSigningAlg: 'RS256'
})

export const jwtParse: RequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ApiError(401, 'Unauthorized')
  }

  const token = authorization.split(' ')[1]

  const decoded = decode(token) as JwtPayload
  const auth0Id = decoded.sub

  const user = await User.findOne({ auth0Id }).exec()

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  req.auth0Id = auth0Id
  req.userId = user._id.toString()

  next()
})
