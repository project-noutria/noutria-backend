import { Schema, model } from 'mongoose'
import { Meal } from '../utils/interface'

interface Ingredient {
  name: string
  qty: number
}

const ingredientSchema = new Schema<Ingredient>({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
})

const MealModel = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  fat: {
    type: Number,
    required: true
  },
  ingredients: {
    type: [ingredientSchema],
    required: true
  },
  procedures: {
    type: [String],
    required: true
  }
})

export default model<Meal>('Meal', MealModel)
