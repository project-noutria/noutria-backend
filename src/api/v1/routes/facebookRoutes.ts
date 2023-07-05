import { Router } from "express";
import passport from "passport";
import "../controllers/facebook";
import { successResponse } from "../utils/responses";

const router = Router();

router.get("/", passport.authenticate("facebook"));

router.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    return successResponse(res, 200, "User Logged in!", { userDetails: req.user, token: req.file });
  }
);
export default router;
