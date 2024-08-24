import { NextFunction, Request, Response } from 'express'
import User from '~/models/user.model'
import ApiError from '~/utils/ApiError'
import asyncHandler from '~/utils/asyncHandler'

interface ICreateUserRequest extends Request {
  body: {
    auth0Id: string
    email: string
  }
}

export const createUser = asyncHandler(async (req: ICreateUserRequest, res: Response, next: NextFunction) => {
  const { auth0Id, email } = req.body

  const user = await User.findOne({ auth0Id }).exec()

  if (user) {
    return res.status(200).send()
  }

  const newUser = new User({ auth0Id, email })

  await newUser.save()

  res.status(200).json({ user: newUser.toObject() })
})
