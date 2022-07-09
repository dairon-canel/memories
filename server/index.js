import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("APP IS RUNNING.");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb://dairon:Dairon123@cluster0-shard-00-00.le5en.mongodb.net:27017,cluster0-shard-00-01.le5en.mongodb.net:27017,cluster0-shard-00-02.le5en.mongodb.net:27017/?ssl=true&replicaSet=atlas-mbiaux-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
