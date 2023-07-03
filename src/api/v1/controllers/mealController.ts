import { Request, Response } from "express";
import { errorResponse, handleError } from "../utils/responses";
import models from "../models";
import {
  validateMealCreation,
} from "../validations/user";

// Handles creation of a new meal
export const createMeal = async (req: Request, res: Response) => {
  try {
    const valid = validateMealCreation(req.body);
    if (valid.error) {
      return errorResponse(res, 400, valid.error.message);
    }

    // Extract the incoming data from the request object
    const {
      name,
      description,
      imgUrl,
      calories,
      protein,
      carbs,
      fat,
      ingredients,
      procedures
    } = req.body;

    // Store/save data in db now
    const mealResponse = await models.Meal.create({
      name,
      description,
      imgUrl,
      calories,
      protein,
      carbs,
      fat,
      ingredients,
      procedures
    });

    // Send success response now
    return res.status(201).send({
      message: "You have successfully created a new meal.",
      data: mealResponse
    });
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error.");
  }
};

// Handles fetching/retrieval of all created meals
export const getAllMeals = async (req: Request, res: Response) => {
  try {
    const allMeals = await models.Meal.find();

    // Send success response now
    return res.status(201).send({
      message: "Fetch meals successful...",
      data: allMeals
    });
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error.");
  }
};
