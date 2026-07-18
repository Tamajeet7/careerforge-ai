import * as repository from "./resume.repository";

export const saveResume =
  repository.upsertResume;

export const getResume =
  repository.findResumeByUserId;

export const updateResumeAnalytics =
  repository.updateResumeAnalytics;

export const deleteResume =
  repository.removeResume;