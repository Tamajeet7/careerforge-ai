import { useState, useEffect } from "react";
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

function getScoreColor(score: number): string {
  if (score >= 80) return "#22C55E";
  if (score >= 65) return "#22C55E";
  if (score >= 50) return "#EAB308";
  if (score >= 35) return "#F97316";
  return "#EF4444";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Average";
  if (score >= 35) return "Below Avg";
  return "Poor";
}

export default function ScoreGauge({
  score,
  label,
}: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 80);
    return () => clearTimeout(timer);
  }, [score]);

  const color = getScoreColor(score);

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <RadialBarChart
          data={[{ value: animatedScore }]}
          innerRadius="68%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          barSize={16}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />

          <RadialBar
            dataKey="value"
            cornerRadius={8}
            fill={color}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
            background={{ fill: "rgba(255,255,255,0.07)" }}
          />

          <text
            x="50%"
            y="42%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white"
            style={{
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            {score}
          </text>

          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={color}
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {getScoreLabel(score)}
          </text>

          <text
            x="50%"
            y="64%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-400"
            style={{
              fontSize: 13,
            }}
          >
            {label}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
