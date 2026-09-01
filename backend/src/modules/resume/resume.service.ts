import * as repository from "./resume.repository";
import { ResumeCache } from "./resume.cache";

import {
  readResume,
  parseResumeWithAI,
} from "./parser";

import type { ParsedResume } from "./parser";

export const saveResume = repository.upsertResume;

export const getResume = repository.findResumeByUserId;

export const updateResumeAnalytics = repository.updateResumeAnalytics;

export async function deleteResume(userId: string) {
  ResumeCache.invalidate(userId);
  return repository.removeResume(userId);
}

export async function getParsedResume(
  userId: string,
  force: boolean = false
): Promise<ParsedResume | null> {
  const resume = await repository.findResumeByUserId(userId);

  if (!resume) return null;

  // Check cache first
  if (!force) {
    const cached = ResumeCache.getParsed(userId, resume.filePath);
    if (cached) {
      return cached;
    }
  }

  const rawText = await readResume(resume.filePath);
  const parsed = await parseResumeWithAI(rawText);

  // Store in cache
  ResumeCache.setParsed(userId, resume.filePath, parsed);

  return parsed;
}