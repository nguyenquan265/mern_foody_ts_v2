import { NextFunction, Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'
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

export const validateRestaurantRequest = [
  body('restaurantName').notEmpty().withMessage('Restaurant name is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('deliveryPrice').isFloat({ min: 0 }).withMessage('Delivery price must be a positive number'),
  body('estimatedDeliveryTime').isInt({ min: 0 }).withMessage('Estimate delivery time must be a positive integer'),
  body('cuisines')
    .isArray()
    .withMessage('Cuisines must be an array')
    .not()
    .isEmpty()
    .withMessage('Cuisines must not be empty'),
  body('menuItems').isArray().withMessage('Menu items must be an array'),
  body('menuItems.*.name').isString().notEmpty().withMessage('Menu item name must be a string'),
  body('menuItems.*.price').isFloat({ min: 0 }).withMessage('Menu item price must be a positive number'),
  handleValidationErrors
]

export const validateRestaurantIdRequest = [
  param('restaurantId').isString().trim().notEmpty().withMessage('RestaurantId parameter must be a string'),
  handleValidationErrors
]

export const validateSearchRestaurantRequest = [
  param('city').isString().trim().notEmpty().withMessage('City parameter must be a string'),
  handleValidationErrors
]
