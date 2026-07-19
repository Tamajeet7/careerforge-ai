import * as repository from "./resume.repository";

import {
  readResume,
  parseResumeText,
} from "./parser";

import type { ParsedResume } from "./parser";

export const saveResume =
  repository.upsertResume;

export const getResume =
  repository.findResumeByUserId;

export const updateResumeAnalytics =
  repository.updateResumeAnalytics;

export const deleteResume =
  repository.removeResume;

export async function getParsedResume(
  userId: string
): Promise<ParsedResume | null> {
  const resume =
    await repository.findResumeByUserId(
      userId
    );

  if (!resume) return null;

  const rawText =
    await readResume(
      resume.filePath
    );

  return parseResumeText(rawText);
}