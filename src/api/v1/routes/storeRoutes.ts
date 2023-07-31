import { Router } from "express";
import { getStoresAround } from "../controllers/store";

const router = Router();

router.get("/get-stores-around", getStoresAround);

export default router;
