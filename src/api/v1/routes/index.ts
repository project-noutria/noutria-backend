import { Router } from "express";
import userRoutes from "./userRoutes";
import googleRoutes from "./googleRoutes";
import mealRoutes from "./mealRoutes";
import restaurantRoutes from "./restaurantRoutes";
import storeRoutes from "./storeRoutes";
import facebookRoutes from "./facebookRoutes";
import recipesearchRoutes from "./recipesearchRoutes";
import mealSuggestionRoutes from "./mealSuggestionRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/google", googleRoutes);
router.use("/facebook", facebookRoutes);
router.use("/meal", mealRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/store", storeRoutes);
router.use("/recipes", recipesearchRoutes);
router.use("/meal-suggestion", mealSuggestionRoutes);

export default router;
