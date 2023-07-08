import { Router } from "express";
import { createRestaurant, getAllRestaurants, getRestaurantsAround } from "../controllers/restaurantController";

const router = Router();

router.post("/", createRestaurant);
router.get("/", getAllRestaurants);
router.get("/get-restaurants-around", getRestaurantsAround);

export default router;


