import dotenv from "dotenv";
import isEmpty from "lodash";

dotenv.config();
const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL, 
  APP_NAME: process.env.APP_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  SECRET: process.env.SECRET as string
};

const absentConfig = Object.entries(config)
  .map(([key, value]) => [key, !!value])
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (!isEmpty(absentConfig)) {
  throw new Error(`Missing Config: ${absentConfig.join(", ")}`);
}
export default config;