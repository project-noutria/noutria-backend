import { Router } from "express";
import { createUser, signinUser } from "../controllers/userControllers";

const router = Router();

router.post("/login", signinUser);
router.post("/register", createUser);

export default router;
