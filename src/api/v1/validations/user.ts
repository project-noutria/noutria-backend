import Joi from 'joi'
import { IUser, Meal, Restaurant } from '../utils/interface'

const options = {
  stripUnknown: true,
  abortEarly: false,
  errors: {
    wrap: {
      label: ''
    }
  }
}

export const validatesignupUser = (signupUser: IUser) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(16),
    phone: Joi.string().required()
  })
  return schema.validate(signupUser, options)
}

export const validatesigninUser = (signinUser: IUser) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
  return schema.validate(signinUser, options)
}

// Newly added
const joiIngredientSchema = Joi.object({
  name: Joi.string().required(),
  qty: Joi.number().required()
})

export const validateMealCreation = (newMeal: Meal) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    imgUrl: Joi.string().required(),
    calories: Joi.number().required(),
    protein: Joi.number().required(),
    carbs: Joi.number().required(),
    fat: Joi.number().required(),
    ingredients: Joi.array().items(joiIngredientSchema).required(),
    procedures: Joi.array().items(Joi.string().required()).required()
  })
  return schema.validate(newMeal, options)
}

export const validateRestaurantCreation = (newRestaurant: Restaurant) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
})
  return schema.validate(newRestaurant, options)
}
