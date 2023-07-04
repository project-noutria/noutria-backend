/* eslint-disable no-redeclare */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { successResponse, errorResponse, handleError } from "../utils/responses";
import models from "../models";
import { validatesigninUser, validatesignupUser } from "../validations/user";
// import { IUser } from "../utils/interface";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jwtHelper from "../utils/jwt";

const { generateToken } = jwtHelper;

export const createUser = async (req: Request, res: Response) => {
  try {
    const valid = validatesignupUser(req.body);
    if (valid.error) {
      return errorResponse(res, 400, valid.error.message);
    }
    const {
      name, email, phone, password
    } = req.body;
    const existingEmail = await models.User.findOne({ email });
    if (existingEmail) {
      return errorResponse(res, 409, "This email has been registered by another user.");
    }
    const phoneExists = await models.User.findOne({ phone });
    if (phoneExists) {
      return errorResponse(res, 501, "Phone number has been registered by another user.");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      name, email, phone, password: passwordHash
    });
    const userDetails = {
      _id: user._id, email, name: user.name, phone: user.phone, role: user.role, active: user.active
    };

    return successResponse(res, 201, "You have successfully created a new account", userDetails);
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error.");
  }
};

export const signinUser = async (req: Request, res:Response) => {
  try {
    const valid = validatesigninUser(req.body);
    if (valid.error) {
      return errorResponse(res, 400, valid.error.message);
    }
    const { email, password } = req.body;
    const user = await models.User.findOne({ email });
    if (!user) {
      return errorResponse(res, 409, "This user does not exist. Please sign up");
    }
    if (!user.active) {
      return errorResponse(res, 403, "User account temporarily on hold, contact admin");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return errorResponse(res, 403, "Invalid credentials. Password incorrect");
    }
    const userDetails = {
      _id: user._id, email, name: user.name, phone: user.phone, role: user.role, active: user.active
    };
    const token = await generateToken({ _id: user._id, email, phone: user.phone });

    return successResponse(
      res,
      200,
      "User Logged in Successfully.",
      { token, userDetails }
    );
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error.");
  }
};
