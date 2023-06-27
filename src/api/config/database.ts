import mongoose from "mongoose";
import config from "./index";

const connect = async () => {
  const connection = await mongoose.connect(config.MONGO_URL as string);
  if (!connection) {
    console.log("database connection error");
    process.emit("SIGTERM");
    process.exit(1);
  }
  console.log("Database connected successfully");
  return connection;
};

export default { connect };