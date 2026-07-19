import type { ParsedResume } from "./resume.types";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Code2,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Trophy,
  Languages,
  FileText,
} from "lucide-react";

interface Props {
  parsed: ParsedResume;
}

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon size={18} className="text-blue-400" />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ListItems({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-500">None detected</p>;
  }

  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-300">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ResumeParserDisplay({
  parsed,
}: Props) {
  return (
    <div className="space-y-6">
      <SectionCard icon={User} title="Contact Information">
        <div className="grid gap-2 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <User size={14} className="text-slate-500" />
            <span>{parsed.contact.name || "Not detected"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-slate-500" />
            <span>{parsed.contact.email || "Not detected"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-slate-500" />
            <span>{parsed.contact.phone || "Not detected"}</span>
          </div>
          {parsed.contact.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-slate-500" />
              <span>{parsed.contact.location}</span>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard icon={Globe} title="Links">
        {parsed.links.linkedin || parsed.links.github || parsed.links.portfolio || parsed.links.website ? (
          <div className="space-y-1 text-sm text-slate-300">
            {parsed.links.linkedin && <p>LinkedIn: {parsed.links.linkedin}</p>}
            {parsed.links.github && <p>GitHub: {parsed.links.github}</p>}
            {parsed.links.portfolio && <p>Portfolio: {parsed.links.portfolio}</p>}
            {parsed.links.website && <p>Website: {parsed.links.website}</p>}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No links detected</p>
        )}
      </SectionCard>

      {parsed.summary && (
        <SectionCard icon={FileText} title="Summary">
          <p className="text-sm leading-relaxed text-slate-300">
            {parsed.summary}
          </p>
        </SectionCard>
      )}

      <SectionCard icon={Code2} title={`Skills (${parsed.skills.length})`}>
        {parsed.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {parsed.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No skills detected</p>
        )}
      </SectionCard>

      <SectionCard icon={GraduationCap} title={`Education (${parsed.education.length})`}>
        <ListItems items={parsed.education} />
      </SectionCard>

      <SectionCard icon={Briefcase} title={`Experience (${parsed.experience.length})`}>
        <ListItems items={parsed.experience} />
      </SectionCard>

      <SectionCard icon={FolderGit2} title={`Projects (${parsed.projects.length})`}>
        <ListItems items={parsed.projects} />
      </SectionCard>

      <SectionCard icon={Award} title={`Certifications (${parsed.certifications.length})`}>
        <ListItems items={parsed.certifications} />
      </SectionCard>

      <SectionCard icon={Trophy} title={`Achievements (${parsed.achievements.length})`}>
        <ListItems items={parsed.achievements} />
      </SectionCard>

      <SectionCard icon={Languages} title={`Languages (${parsed.languages.length})`}>
        <ListItems items={parsed.languages} />
      </SectionCard>
    </div>
  );
}
