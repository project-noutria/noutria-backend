import { Request, Response } from "express";
import axios from "axios";
import config from "../../config";
import { successResponse, handleError, errorResponse } from "../utils/responses";
import { userMealOptions } from "../dummyDb/mealOptions";
import shuffleArray from "../helpers/helper";

const suggestUserMeals = async (req: Request, res: Response) => {
  try {
    // let responseData = shuffleArray(userMealOptions);

    return successResponse(res, 200, "Meal options fetched succesfully", userMealOptions);
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error.");
  }
};

export default suggestUserMeals;
