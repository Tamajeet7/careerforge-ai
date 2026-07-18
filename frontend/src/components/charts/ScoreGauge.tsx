import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface ScoreGaugeProps {
  score: number;
  label: string;
}

export default function ScoreGauge({
  score,
  label,
}: ScoreGaugeProps) {
  const data = [
    {
      value: score,
    },
  ];

  return (
    <div className="h-72 w-full">

      <ResponsiveContainer>

        <RadialBarChart
          data={data}
          innerRadius="72%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
        >

          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />

          <RadialBar
            dataKey="value"
            cornerRadius={18}
            fill="#2563EB"
          />

          <text
            x="50%"
            y="46%"
            textAnchor="middle"
            className="fill-white text-5xl font-bold"
          >
            {score}
          </text>

          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            className="fill-slate-400 text-base"
          >
            {label}
          </text>

        </RadialBarChart>

      </ResponsiveContainer>

    </div>
  );
}