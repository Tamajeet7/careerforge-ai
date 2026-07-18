import ResumeStatus from "./ResumeStatus";
import ResumeInfoCard from "./ResumeInfoCard";
import SkillCard from "./SkillCard";

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

export default function ResumeSidebar({
  resume,
  ats,
}: Props) {
  return (
    <aside className="space-y-6">

      <ResumeStatus
        ats={ats}
        updatedAt={resume.updatedAt}
      />

      <SkillCard
        skills={resume.skills}
      />

      <ResumeInfoCard
        resume={resume}
      />

    </aside>
  );
}