import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { ZodError } from "zod";

import { ApiError } from "../shared/errors/ApiError";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  /*
  |--------------------------------------------------------------------------
  | Custom API Errors
  |--------------------------------------------------------------------------
  */

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Zod Validation
  |--------------------------------------------------------------------------
  */

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten(),
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Unknown Errors
  |--------------------------------------------------------------------------
  */

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}