import { Router } from "express";
import { createRestaurant, getAllRestaurants } from "../controllers/restaurantController";

const router = Router();

router.post("/", createRestaurant);
router.get("/", getAllRestaurants);

export default router;


