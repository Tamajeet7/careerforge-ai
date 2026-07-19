import api from "../../../api/axios";

export const uploadResume = (
  formData: FormData
) =>
  api.post(
    "/resume/upload",
    formData
  );

export const getResume = () =>
  api.get("/resume/me");

export const getATS = () =>
  api.get("/ats");

export const replaceResume = (
  formData: FormData
) =>
  api.post(
    "/resume/upload",
    formData
  );

export const deleteResume = () =>
  api.delete("/resume");

export const getParsedResume = () =>
  api.get("/resume/parsed");