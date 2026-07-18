import ProgressBar from "./ProgressBar";

interface MetricProps {
  title: string;
  value: number;
  max?: number;
  color?: "blue" | "green" | "yellow" | "red";
}

const gradients = {
  blue: "from-blue-500 to-cyan-400",
  green: "from-emerald-500 to-green-400",
  yellow: "from-yellow-500 to-orange-400",
  red: "from-red-500 to-pink-500",
};

export default function Metric({
  title,
  value,
  max = 100,
  color = "blue",
}: MetricProps) {
  return (
    <div className="space-y-3">

      <div className="flex items-center justify-between">

        <span className="text-sm text-slate-400">
          {title}
        </span>

        <span className="text-lg font-bold text-white">
          {value}
          {max === 100 && "%"}
        </span>

      </div>

      <ProgressBar
        value={value}
        max={max}
        gradient={gradients[color]}
      />

    </div>
  );
}