import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import {
  getResume,
  getParsedResume,
} from "../components/resume/resume.service";
import { getATS } from "../services/ats.service";

import type {
  Resume,
  ParsedResume,
  ATSResult,
} from "../components/resume/resume.types";

interface ResumeContextType {
  resume: Resume | null;
  parsed: ParsedResume | null;
  ats: ATSResult | null;
  loadingResume: boolean;
  loadingATS: boolean;
  fetchResume: (force?: boolean) => Promise<void>;
  fetchATS: (force?: boolean) => Promise<void>;
  loadAll: (force?: boolean) => Promise<void>;
  invalidate: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(
  undefined
);

export function ResumeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [resume, setResume] = useState<Resume | null>(() => {
    try {
      const saved = sessionStorage.getItem("cf_resume");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [parsed, setParsed] = useState<ParsedResume | null>(() => {
    try {
      const saved = sessionStorage.getItem("cf_parsed");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [ats, setATS] = useState<ATSResult | null>(() => {
    try {
      const saved = sessionStorage.getItem("cf_ats");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loadingResume, setLoadingResume] = useState(false);
  const [loadingATS, setLoadingATS] = useState(false);

  // Keep ref to avoid stale closures in callbacks
  const stateRef = useRef({ resume, parsed, ats });
  useEffect(() => {
    stateRef.current = { resume, parsed, ats };
  }, [resume, parsed, ats]);

  // Sync with sessionStorage
  useEffect(() => {
    try {
      if (resume) sessionStorage.setItem("cf_resume", JSON.stringify(resume));
      else sessionStorage.removeItem("cf_resume");

      if (parsed) sessionStorage.setItem("cf_parsed", JSON.stringify(parsed));
      else sessionStorage.removeItem("cf_parsed");

      if (ats) sessionStorage.setItem("cf_ats", JSON.stringify(ats));
      else sessionStorage.removeItem("cf_ats");
    } catch (e) {
      console.warn("Failed to sync to sessionStorage:", e);
    }
  }, [resume, parsed, ats]);

  const fetchResume = useCallback(async (force: boolean = false) => {
    const current = stateRef.current;
    if (!force && current.resume && current.parsed) {
      return;
    }

    setLoadingResume(true);
    try {
      const resumeData = await getResume();
      setResume(resumeData);

      if (resumeData) {
        const parsedData = await getParsedResume().catch(() => null);
        setParsed(parsedData);
      } else {
        setParsed(null);
      }
    } catch (error) {
      console.error("[ResumeContext] Failed to fetch resume:", error);
      if (force) {
        setResume(null);
        setParsed(null);
      }
    } finally {
      setLoadingResume(false);
    }
  }, []);

  const fetchATS = useCallback(async (force: boolean = false) => {
    const current = stateRef.current;
    if (!force && current.ats) {
      return;
    }

    setLoadingATS(true);
    try {
      const atsData = await getATS(force);
      setATS(atsData);
    } catch (error) {
      console.error("[ResumeContext] Failed to fetch ATS:", error);
    } finally {
      setLoadingATS(false);
    }
  }, []);

  const loadAll = useCallback(async (force: boolean = false) => {
    const current = stateRef.current;
    if (!force && current.resume && current.parsed && current.ats) {
      return;
    }

    setLoadingResume(true);
    setLoadingATS(true);
    try {
      const [resumeData, atsData] = await Promise.all([
        getResume().catch(() => null),
        getATS(force).catch(() => null),
      ]);

      setResume(resumeData);
      setATS(atsData);

      if (resumeData) {
        const parsedData = await getParsedResume().catch(() => null);
        setParsed(parsedData);
      } else {
        setParsed(null);
      }
    } catch (error) {
      console.error("[ResumeContext] Failed to load all data:", error);
    } finally {
      setLoadingResume(false);
      setLoadingATS(false);
    }
  }, []);

  const invalidate = useCallback(() => {
    setResume(null);
    setParsed(null);
    setATS(null);
    try {
      sessionStorage.removeItem("cf_resume");
      sessionStorage.removeItem("cf_parsed");
      sessionStorage.removeItem("cf_ats");
    } catch {}
  }, []);

  // Initial load only if nothing is in state or storage
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      if (!stateRef.current.resume) {
        loadAll(false);
      }
    }
  }, [loadAll]);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        parsed,
        ats,
        loadingResume,
        loadingATS,
        fetchResume,
        fetchATS,
        loadAll,
        invalidate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error(
      "useResumeContext must be used within a ResumeProvider"
    );
  }
  return context;
}
