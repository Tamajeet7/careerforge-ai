import type { Request, Response } from "express";

import {
  readResume,
  parseResumeText,
} from "./parser";

import {
  saveResume,
  getResume,
  updateResumeAnalytics,
} from "./resume.service";

import { calculateATS } from "../ats";

export async function uploadResume(
  req: Request,
  res: Response
) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Read Resume
    |--------------------------------------------------------------------------
    */

    const rawText =
      await readResume(req.file.path);

    /*
    |--------------------------------------------------------------------------
    | Parse Resume
    |--------------------------------------------------------------------------
    */

    const parsed =
      parseResumeText(rawText);

    /*
    |--------------------------------------------------------------------------
    | Save Resume
    |--------------------------------------------------------------------------
    */

    const resume =
      await saveResume({
        userId: req.user!.userId,

        name: parsed.contact.name,
        email: parsed.contact.email,
        phone: parsed.contact.phone,

        skills: parsed.skills,

        fileName:
          req.file.originalname,

        filePath:
          `uploads/${req.file.filename}`,

        fileSize:
          req.file.size,

        mimeType:
          req.file.mimetype,

        pages: 1,
      });

    /*
    |--------------------------------------------------------------------------
    | ATS Analysis
    |--------------------------------------------------------------------------
    */

    const ats =
    calculateATS(parsed);

    await updateResumeAnalytics(
        req.user!.userId,
        {
            atsScore: ats.score,

            resumeQuality:
                ats.resumeQuality,

            skillsMatch:
                ats.skillsMatch,

            aiConfidence:
                ats.aiConfidence,
        }
    );

    return res.status(201).json({
      success: true,
      message:
        "Resume uploaded successfully",
      data: {
        resume,
        ats,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Resume upload failed",
    });
  }
}

export async function getMyResume(
  req: Request,
  res: Response
) {
  try {
    const resume =
      await getResume(
        req.user!.userId
      );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message:
          "Resume not found",
      });
    }

    return res.json({
      success: true,
      data: {
        ...resume,

        fileUrl:
          `${req.protocol}://${req.get("host")}/${resume.filePath}`,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch resume",
    });
  }
}

export async function getATSScore(
  req: Request,
  res: Response
) {
  try {
    const resume =
      await getResume(
        req.user!.userId
      );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message:
          "Resume not found",
      });
    }

    return res.json({
      success: true,

      data: {
        atsScore:
          resume.atsScore,

        resumeQuality:
          resume.resumeQuality,

        skillsMatch:
          resume.skillsMatch,

        aiConfidence:
          resume.aiConfidence,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch ATS score",
    });
  }
}