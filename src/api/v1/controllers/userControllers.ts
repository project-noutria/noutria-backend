/* eslint-disable no-redeclare */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { successResponse, errorResponse, handleError } from "../utils/responses";
import models from "../models";
import { validatesigninUser, validatesignupUser, validateRegistration } from "../validations/user";
import jwtHelper from "../utils/jwt";
import { IUser, } from "../utils/interface";
import sendEmail from "../utils/email";

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
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    await models.Otp.create({ email, token: otp });
    const subject = "User created";
    const message = `hi, thank you for signing up kindly verify your account with this token ${otp}`;
    await sendEmail(email, subject, message);
    return successResponse(res, 201, "Account created successfully, kindly verify your email and login.", userDetails);
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
    if (!user.verified) {
      return errorResponse(res, 409, "Kindly verify your account before logging in.");
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

export const resendOtp = async (req: Request, res: Response) => {
  try {
    // const { email } = req.body;
    const user: IUser | null = await models.User.findOne(req.body.email);
    if (!user) { return errorResponse(res, 404, "Email does not exist."); }
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    await models.Otp.findOneAndUpdate(req.body.email, { token: otp, expired: false });
    const subject = "Resend otp";
    const message = `hi, kindly verify your account with this token ${otp}`;
    await sendEmail(req.body.email, subject, message);
    return successResponse(
      res,
      201,
      "A token has been sent to your account for verification."
    );
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error");
  }
};

export const registration = async (req: Request, res: Response) => {
  try {
    const { error } = validateRegistration(req.body);
    if (error) {
      return errorResponse(res, 400, error.message);
    }
    const {
      gender, age, weight, height, preferences, goal
    } = req.body;
    const { _id } = req.profile;
    const user = await models.User.findByIdAndUpdate(_id, {
      gender, age, weight, height, preferences, goal
    }).select("-password");
    return successResponse(res, 200, "Your profile has been succesfully setup", user);
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, (error as Error).message);
  }
};
