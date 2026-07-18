import api from "../api/axios";

import type { ATSResult } from "../types/ats.types";

export async function getATS(): Promise<ATSResult> {
  const response = await api.get("/ats");

  return response.data.data;
}