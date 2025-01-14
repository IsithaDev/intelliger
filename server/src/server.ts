import dotenv from "dotenv";
import { createServer } from "http";

import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;

const server = createServer(app);

server.listen(port, () => console.log("Server is running..."));
