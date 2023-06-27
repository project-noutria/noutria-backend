import Joi from "joi";
import { IUser } from "../utils/interface";

const options = {
  stripUnknown: true,
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const validatesignupUser = (signupUser: IUser) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(16),
    phone: Joi.string().required(),
  });
  return schema.validate(signupUser, options);
};

export const validatesigninUser = (signinUser: IUser) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(signinUser, options);
};
