import { Request, Response } from "express";
import { errorResponse, handleError } from "../utils/responses";
import axios from "axios";
import config from "../../config";

// Handles fetching/retrieval of all restaurants around based on google api
export const getStoresAround = async (req: Request, res: Response) => {
  try {
    const {longitude, latitude} = req?.query;
    const placeType = "store";
    const radius = "1000";
    const apiKey = config.GOOGLE_PLACES_APIKEY;

    // Make API call to the external API
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${placeType}&key=${apiKey}`);
    
    // Extract the data from the response
    const responseData = response.data;

    // Send success response now
    return res.status(201).send({
      message: "Fetch stores successful...",
      data: responseData
    });
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error.");
  }
};
