import { Request, Response } from "express";

import { getResume } from "../services/resume.service";
import { calculateATS } from "../services/ats.service";

export async function getATS(
  req: Request,
  res: Response
) {
  const resume = await getResume(req.user!.userId);

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found",
    });
  }

  const ats = calculateATS(resume);

  return res.json({
    success: true,
    data: ats,
  });
}