import type {
  Request,
  Response,
} from "express";

import {
  ApiResponse,
  asyncHandler,
  NotFoundError,
} from "../../shared";

import {
  getResume,
} from "../resume";

import {
  calculateATS,
} from "./ats.service";

import {
  parseResumeText,
  readResume,
} from "../resume/parser";

export const getATS =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const resume =
        await getResume(
          req.user!.userId
        );

      if (!resume)
        throw new NotFoundError(
          "Resume not found"
        );

      const raw =
        await readResume(
          resume.filePath
        );

      const parsed =
        parseResumeText(raw);

      const ats =
        calculateATS(parsed);

      return ApiResponse.success(
        res,
        ats
      );
    }
  );