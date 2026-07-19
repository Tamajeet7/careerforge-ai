import * as api from "./api/resume.api";

export async function uploadResume(
  formData: FormData
) {
  const { data } =
    await api.uploadResume(
      formData
    );

  return data;
}

export async function getResume() {
  const { data } =
    await api.getResume();

  return data.data;
}

export async function getATS() {
  const { data } =
    await api.getATS();

  return data.data;
}

export async function replaceResume(
  formData: FormData
) {
  const { data } =
    await api.replaceResume(
      formData
    );

  return data;
}

export async function deleteResume() {
  const { data } =
    await api.deleteResume();

  return data;
}

export async function getParsedResume() {
  const { data } =
    await api.getParsedResume();

  return data.data;
}