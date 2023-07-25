import { Router } from "express";
import mealRoutes from "../controllers/mealSuggestion";


const router = Router();

router.get("/", mealRoutes);

export default router;
