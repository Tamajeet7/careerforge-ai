import type { Request, Response } from "express";

import {
  ApiResponse,
  asyncHandler,
  NotFoundError,
} from "../../shared";

import {
  getResume,
  updateResumeAnalytics,
  getParsedResume as getParsedResumeService,
} from "../resume";

import { ResumeCache } from "../resume/resume.cache";
import { calculateATS } from "./ats.service";

export const getATS = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const reanalyze = req.query.reanalyze === "true";

    const resume = await getResume(userId);

    if (!resume) {
      throw new NotFoundError("Resume not found");
    }

    // Check cache unless reanalyze was explicitly requested
    if (!reanalyze) {
      const cached = ResumeCache.getATS(userId, resume.filePath);
      if (cached) {
        return ApiResponse.success(res, cached);
      }
    }

    // Get parsed resume (uses cache unless reanalyze is true)
    const parsed = await getParsedResumeService(userId, reanalyze);
    if (!parsed) {
      throw new NotFoundError("Failed to parse resume");
    }

    const ats = await calculateATS(parsed);

    // Cache the result
    ResumeCache.setATS(userId, resume.filePath, ats);

    // Update analytics in database
    await updateResumeAnalytics(userId, {
      atsScore: ats.score,
      resumeQuality: ats.resumeQuality,
      skillsMatch: ats.skillsMatch,
      aiConfidence: ats.aiConfidence,
    });

    return ApiResponse.success(res, ats);
  }
);