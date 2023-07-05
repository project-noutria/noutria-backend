import { Router } from "express";
import userRoutes from "./userRoutes";
import googleRoutes from "./googleRoutes";
import mealRoutes from "./mealRoutes";
import restaurantRoutes from "./restaurantRoutes";
import facebookRoutes from "./facebookRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/google", googleRoutes);
router.use("/facebook", facebookRoutes);
router.use("/meal", mealRoutes);
router.use("/restaurant", restaurantRoutes);
export default router;
