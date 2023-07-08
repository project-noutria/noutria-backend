import { Document } from "mongoose";

export enum Role {
  ADMIN = "admin",
  USER = "user"
}
export enum Goal {
  LOSE_WEIGHT = "lose Weight",
  EAT_HEALTHY = "eat Healthy",
  STAY_FIT = "stay fit",
  GAIN_MUSCLE = "gain Muscle"
}
export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "other"
}
export enum Preferences {
  FISH = "fish",
  DAIRY = "diary",
  PROTEIN = "protein",
  VEGETABLES = "vegetables",
  ORGANIC = "organic",
  VEGAN = "vegan",
  SNACK = "snack",
  FRUITS = "fruits",
  ALCOHOL = "alcohol"
}

export interface IUser {
  _id?: string
  name: string
  email: string
  phone: string
  password: string
  weight?: number
  height?: number
  gender?: Gender
  age?: number
  role: Role
  verified?: boolean
  active?: boolean
  preferences?: Preferences
  goal?: Goal
  createdAt: Date
  updatedAt: Date
}
export interface CustomRequest {
  profile: IUser
  file: object
  params: object
  query: object
  path: object
}

// Newly added
export interface Ingredient {
  name: string
  qty: number
}

export interface Meal extends Document {
  name: string
  description: string
  imgUrl: string
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients: Ingredient[]
  procedures: [string]
}

export interface Restaurant extends Document {
  name: string
  address: string
}
