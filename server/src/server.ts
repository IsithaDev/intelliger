import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";

import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;
const mongodb_url = process.env.MONGODB_URL;

mongoose
  .connect(mongodb_url, { dbName: "intelliger" })
  .then(() => console.log("Mongodb connected!"))
  .catch((error) => console.log(error));

const server = createServer(app);

server.listen(port, () => console.log("Server is running..."));
