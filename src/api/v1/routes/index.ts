import { Router } from "express";
import userRoutes from "./userRoutes";
import googleRoutes from "./googleRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/google", googleRoutes);
export default router;
