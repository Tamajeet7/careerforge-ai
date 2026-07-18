import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import routes from ".";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL?.replace(/\/$/, "") ??
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Static Files
|--------------------------------------------------------------------------
*/

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api", routes);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);

export default app;