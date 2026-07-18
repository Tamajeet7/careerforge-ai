import {
  ResumePreview,
  ResumeSidebar,
} from "../../../../..";

import type {
  Resume,
} from "../resume.types";

import type {
  ATSResult,
} from "../../../types/ats.types";

interface Props {
  resume: Resume;
  ats: ATSResult;
}

export default function ResumeWorkspace({
  resume,
  ats,
}: Props) {
  return (
    <section className="grid gap-8 xl:grid-cols-[2fr_1fr]">

      <ResumePreview
        resume={resume}
      />

      <ResumeSidebar
        resume={resume}
        ats={ats}
      />

    </section>
  );
}