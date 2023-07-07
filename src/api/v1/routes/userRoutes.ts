import { Router } from "express";
import { createUser, signinUser, registration } from "../controllers/userControllers";
import verifyUser from "../middleware/authentication";

const router = Router();

router.post("/login", signinUser);
router.post("/register", createUser);
router.post("/registration", verifyUser, registration);

export default router;
