import {
  CheckCircle2,
  Sparkles,
  FileText,
} from "lucide-react";

const activities = [
  {
    icon: <FileText size={18} />,
    title: "Resume uploaded",
    time: "Today",
  },
  {
    icon: <Sparkles size={18} />,
    title: "ATS analysis completed",
    time: "2 min ago",
  },
  {
    icon: <CheckCircle2 size={18} />,
    title: "AI suggestions generated",
    time: "Just now",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-7 backdrop-blur-xl">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-center justify-between rounded-2xl bg-slate-800/40 p-4 transition hover:bg-slate-800"
          >
            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-blue-600/20 p-3 text-blue-400">
                {activity.icon}
              </div>

              <div>

                <p className="font-medium text-white">
                  {activity.title}
                </p>

                <p className="text-sm text-slate-400">
                  {activity.time}
                </p>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}