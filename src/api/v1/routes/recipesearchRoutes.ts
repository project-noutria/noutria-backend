import { Router } from "express";
import findRecipe from "../controllers/recipeSearch";
import { verifyUser } from "../middleware/authentication";

const router = Router();

router.get("/", verifyUser, findRecipe);

export default router;
