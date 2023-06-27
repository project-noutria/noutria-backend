import jwt from "jsonwebtoken";
import config from "../../config/index";

const secretKey = config.JWT_SECRET;

export default class jwtHelper {
  static async generateToken(payload: any, secret = secretKey) {
    const token = await jwt.sign(payload, secret as string, { expiresIn: "1d" });
    return token;
  }
}
