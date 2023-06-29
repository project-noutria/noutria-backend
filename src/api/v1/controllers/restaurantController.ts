import { Request, Response } from 'express'
import { errorResponse, handleError } from '../utils/responses'
import models from '../models'
import {
  validateMealCreation, validateRestaurantCreation,
} from '../validations/user'


// Handles creation of a new restaurant
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const valid = validateRestaurantCreation(req.body)
    if (valid.error) {
      return errorResponse(res, 400, valid.error.message)
    }

    // Extract the incoming data from the request object
    const {
      name,
      address
    } = req.body

    // Store/save data in db now
    const createdRestaurant = await models.Restaurant.create({
      name,
      address
    })

    // Send success response now
    return res.status(201).send({
      message: 'You have successfully created a new restaurant.',
      data: createdRestaurant
    })
  } catch (error) {
    handleError(error, req)
    return errorResponse(res, 500, 'Server error.')
  }
}

// Handles fetching/retrieval of all created restaurants
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const allRestaurants = await models.Restaurant.find()

    // Send success response now
    return res.status(201).send({
      message: 'Fetch restaurants successful...',
      data: allRestaurants
    })
  } catch (error) {
    handleError(error, req)
    return errorResponse(res, 500, 'Server error.')
  }
}
