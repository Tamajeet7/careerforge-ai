import api from "../api/axios";

import type { ATSResult } from "../types/ats.types";

export async function getATS(reanalyze: boolean = false): Promise<ATSResult> {
  const response = await api.get("/ats", {
    params: reanalyze ? { reanalyze: true } : undefined,
  });

  return response.data.data;
}