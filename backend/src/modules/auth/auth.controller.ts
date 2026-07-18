import type {
  Request,
  Response,
} from "express";

import {
  ApiResponse,
  asyncHandler,
} from "../../shared";

import {
  loginSchema,
  registerSchema,
} from "./validators";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "./auth.service";

import {
  NotFoundError,
} from "../../shared/errors";

export const register =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const data =
        registerSchema.parse(req.body);

      const result =
        await registerUser(data);

      return ApiResponse.created(
        res,
        result,
        "Registration successful"
      );
    }
  );

export const login =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const data =
        loginSchema.parse(req.body);

      const result =
        await loginUser(data);

      return ApiResponse.success(
        res,
        result,
        "Login successful"
      );
    }
  );

export const me =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const user =
        await getCurrentUser(
          req.user!.userId
        );

      if (!user)
        throw new NotFoundError(
          "User not found"
        );

      return ApiResponse.success(
        res,
        user
      );
    }
  );