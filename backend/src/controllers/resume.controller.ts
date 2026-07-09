import type { Request, Response } from "express";
import { parseResume } from "../services/resumeParser.service";
import { extractResumeData } from "../services/resumeExtractor.service";
import { saveResume } from "../services/resume.service";
import { getResume } from "../services/resume.service";
import { calculateATSScore } from "../services/ats.service";
import { getResumeByUserId } from "../services/resume.service";

export async function uploadResume(
  req: Request,
  res: Response
) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const text = await parseResume(req.file.buffer);
  const resume = extractResumeData(text);
  const savedResume = await saveResume({
  rawText: text,
  ...resume,
  userId: req.user!.userId,
  });

  res.status(200).json({
    success: true,
    data: savedResume,
  });
}

export async function getMyResume(
  req: Request,
  res: Response
) {
  const resume = await getResume(req.user!.userId);

  res.json({
    success: true,
    data: resume,
  });
}

export async function getATSScore(
  req: Request,
  res: Response
) {
  const resume = await getResumeByUserId(
    req.user!.userId
  );

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found",
    });
  }

  const result = calculateATSScore({
    name: resume.name,
    email: resume.email,
    phone: resume.phone,
    skills: resume.skills as string[],
  });

  res.json({
    success: true,
    data: result,
  });
}