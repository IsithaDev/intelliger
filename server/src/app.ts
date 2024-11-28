import express, { NextFunction, Request, Response } from "express";

import userRoutes from "./routes/userRoutes";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`Cannot find ${req.originalUrl} on this server.`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
