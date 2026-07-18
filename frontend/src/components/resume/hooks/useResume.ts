import {
  useEffect,
  useState,
} from "react";

import * as service from "../resume.service";

import type {
  Resume,
  ATSResult,
} from "../resume.types";

export function useResume() {
  const [
    resume,
    setResume,
  ] = useState<
    Resume | null
  >(null);

  const [
    ats,
    setATS,
  ] = useState<
    ATSResult | null
  >(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  async function refresh() {
    setLoading(true);

    try {
      const [
        resumeData,
        atsData,
      ] =
        await Promise.all([
          service.getResume(),
          service.getATS(),
        ]);

      setResume(resumeData);
      setATS(atsData);
    } finally {
      setLoading(false);
    }
  }

  async function upload(
    formData: FormData
  ) {
    await service.uploadResume(
      formData
    );

    await refresh();
  }

  async function replace(
    formData: FormData
  ) {
    await service.replaceResume(
      formData
    );

    await refresh();
  }

  async function remove() {
    await service.deleteResume();

    setResume(null);
    setATS(null);
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    resume,
    ats,
    loading,

    refresh,
    upload,
    replace,
    remove,
  };
}