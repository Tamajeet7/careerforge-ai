import SectionCard from "../../ui/SectionCard";

interface SkillCardProps {
  skills: string[];
}

export default function SkillCard({
  skills,
}: SkillCardProps) {
  return (
    <SectionCard
      title="Technical Skills"
      subtitle="Detected from your resume"
    >
      {skills.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 text-center text-slate-400">
          No technical skills detected.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-3
                py-1.5
                text-sm
                font-medium
                text-blue-300
                transition-all
                hover:border-blue-400
                hover:bg-blue-500/20
              "
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </SectionCard>
  );
}