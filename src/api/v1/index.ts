import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "../config";
import database from "../config/database";



const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

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
  