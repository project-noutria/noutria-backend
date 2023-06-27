/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import express from "express";
import cors from "cors";
import passport from "passport";
import bodyParser from "body-parser";
import session from "express-session";
import reqLogger from "./utils/reqLogger";
import config from "../config";
import { CustomRequest } from "./utils/interface";
import router from "./routes/index";
import models from "./models";
import database from "../config/database";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: config.SECRET as string,
  cookie: { secure: true }
}));

app.use(reqLogger);
app.use("/api/v1", router);

declare global {
  namespace Express {
    interface Request extends CustomRequest { }
  }
}
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await models.User.findById(id);
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(`Hello, ${config.APP_NAME}`);
});

app.use((req, res) => {
  return res.status(404).json({ error: "Invalid Route" });
});
app.listen(3000, async () => {
  await database.connect();
  console.log("Server is running on port 3000");
});
