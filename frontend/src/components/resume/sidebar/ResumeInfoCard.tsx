import {
  SectionCard,
  DetailRow,
} from "../../ui";

import {
  User,
  Mail,
  Phone,
  FileText,
  HardDrive,
} from "lucide-react";

import type {
  Resume,
} from "../resume.types";

interface Props {
  resume: Resume;
}

export default function ResumeInfoCard({
  resume,
}: Props) {
  return (
    <SectionCard
      title="Resume Information"
      subtitle="Parsed resume details"
    >
      <DetailRow
        icon={<User size={16} />}
        label="Candidate"
        value={resume.name}
      />

      <DetailRow
        icon={<Mail size={16} />}
        label="Email"
        value={resume.email}
      />

      <DetailRow
        icon={<Phone size={16} />}
        label="Phone"
        value={resume.phone}
      />

      <DetailRow
        icon={<FileText size={16} />}
        label="Pages"
        value={resume.pages}
      />

      <DetailRow
        icon={<HardDrive size={16} />}
        label="File Size"
        value={`${(
          resume.fileSize / 1024
        ).toFixed(1)} KB`}
      />
    </SectionCard>
  );
}