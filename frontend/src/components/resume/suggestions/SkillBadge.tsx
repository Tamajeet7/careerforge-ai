interface SkillBadgeProps {
  skill: string;
}

export default function SkillBadge({
  skill,
}: SkillBadgeProps) {
  return (
    <span className="rounded-full border border-blue-500 bg-blue-600/20 px-3 py-1 text-sm text-blue-300">
      {skill}
    </span>
  );
}