import { Schema, model } from 'mongoose'
import { Restaurant } from '../utils/interface'

const RestaurantModel = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

export default model<Restaurant>('Restuarant', RestaurantModel)
