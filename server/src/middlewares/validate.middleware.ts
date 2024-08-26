import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import ApiError from '~/utils/ApiError'
import asyncHandler from '~/utils/asyncHandler'

const handleValidationErrors = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorsString = errors
      .array()
      .map((error) => error['msg'])
      .join(', ')

    throw new ApiError(400, errorsString)
  }

  next()
})

export const validateUserRequest = [
  body('name').isString().notEmpty().withMessage('Name must be a string'),
  body('addressLine1').isString().notEmpty().withMessage('Address line 1 must be a string'),
  body('country').isString().notEmpty().withMessage('Country must be a string'),
  body('city').isString().notEmpty().withMessage('City must be a string'),
  handleValidationErrors
]
