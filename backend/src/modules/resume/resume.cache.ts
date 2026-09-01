import type { ParsedResume } from "./parser";
import type { ATSResult } from "../ats/ats.types";

interface CacheEntry<T> {
  filePath: string;
  data: T;
  timestamp: number;
}

const parsedResumeCache = new Map<string, CacheEntry<ParsedResume>>();
const atsResultCache = new Map<string, CacheEntry<ATSResult>>();

export const ResumeCache = {
  getParsed(userId: string, currentFilePath: string): ParsedResume | null {
    const entry = parsedResumeCache.get(userId);
    if (entry && entry.filePath === currentFilePath) {
      return entry.data;
    }
    return null;
  },

  setParsed(userId: string, filePath: string, parsed: ParsedResume): void {
    parsedResumeCache.set(userId, {
      filePath,
      data: parsed,
      timestamp: Date.now(),
    });
  },

  getATS(userId: string, currentFilePath: string): ATSResult | null {
    const entry = atsResultCache.get(userId);
    if (entry && entry.filePath === currentFilePath) {
      return entry.data;
    }
    return null;
  },

  setATS(userId: string, filePath: string, ats: ATSResult): void {
    atsResultCache.set(userId, {
      filePath,
      data: ats,
      timestamp: Date.now(),
    });
  },

  invalidate(userId: string): void {
    parsedResumeCache.delete(userId);
    atsResultCache.delete(userId);
  },
};
