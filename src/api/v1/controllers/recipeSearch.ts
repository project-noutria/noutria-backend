import { Request, Response } from "express";
import axios from "axios";
import config from "../../config";
import { successResponse, handleError, errorResponse } from "../utils/responses";

const findRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await axios.get(
      `https://api.edamam.com/search?q=${req.query.q}&app_id=${config.EDAMAM_APP_ID}&app_key=${config.EDAMAM_APP_KEY}`
    );
    const { data } = recipe;
    return successResponse(res, 200, "Recipies found succesfully", data.hits);
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error.");
  }
};

export default findRecipe; 
