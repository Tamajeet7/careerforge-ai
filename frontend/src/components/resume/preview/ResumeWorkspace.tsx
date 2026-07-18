import ResumePreview from "./ResumePreview";

import ResumeSidebar from "../sidebar/ResumeSidebar";

import type { Resume } from "../resume.types";
import type { ATSResult } from "../../../types/ats.types";

interface ResumeWorkspaceProps {
  resume: Resume;
  ats: ATSResult;
}

export default function ResumeWorkspace({
  resume,
  ats,
}: ResumeWorkspaceProps) {
  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-white">
          Resume Workspace
        </h2>

        <p className="mt-2 text-slate-400">
          Review your resume, monitor AI analysis,
          and improve it with actionable suggestions.
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-12">

        <div className="xl:col-span-8">

          <ResumePreview
            resume={resume}
          />

        </div>

        <div className="xl:col-span-4">

          <ResumeSidebar
            resume={resume}
            ats={ats}
          />

        </div>

      </div>

    </section>
  );
}