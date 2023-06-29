import { Router } from "express";
import { createMeal, getAllMeals } from "../controllers/mealController";

const router = Router();

router.post("/", createMeal);
router.get("/", getAllMeals);

export default router;


