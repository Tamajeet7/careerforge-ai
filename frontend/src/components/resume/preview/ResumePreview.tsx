import {
  Download,
  RefreshCw,
  Upload,
  FileText,
} from "lucide-react";

import {
  SectionCard,
  Button,
  MetricCard,
} from "../../ui";

import PDFViewer from "./PDFViewer";

import type { Resume } from "../resume.types";

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({
  resume,
}: ResumePreviewProps) {
  const format =
    resume.mimeType
      .split("/")
      .pop()
      ?.toUpperCase();

  return (
    <SectionCard
      title="Resume Preview"
      subtitle="View and manage your uploaded resume"
    >
      {resume.fileUrl ? (
        <PDFViewer
          file={resume.fileUrl}
        />
      ) : (
        <div className="flex h-[550px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950">

          <div className="text-center">

            <FileText
              size={48}
              className="mx-auto mb-4 text-slate-500"
            />

            <h3 className="text-lg font-semibold text-white">
              No Preview Available
            </h3>

            <p className="mt-2 text-slate-400">
              Unable to load this resume.
            </p>

          </div>

        </div>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-4">

        <MetricCard
          title="Filename"
          value={resume.fileName}
        />

        <MetricCard
          title="Format"
          value={format ?? "PDF"}
        />

        <MetricCard
          title="Pages"
          value={resume.pages}
        />

        <MetricCard
          title="Size"
          value={`${(
            resume.fileSize / 1024
          ).toFixed(1)} KB`}
        />

      </div>

      <div className="mt-8 flex flex-wrap gap-4">

        <Button
          leftIcon={<Download size={18} />}
          onClick={() => {
            const a = document.createElement("a");
            a.href = resume.fileUrl!;
            a.download = resume.fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}
        >
          Download
        </Button>

        <Button
          variant="secondary"
          leftIcon={<RefreshCw size={18} />}
          onClick={() => document.getElementById("replace-section")?.scrollIntoView({ behavior: "smooth" })}
        >
          Reanalyze
        </Button>

        <Button
          variant="secondary"
          leftIcon={<Upload size={18} />}
          onClick={() => document.getElementById("replace-section")?.scrollIntoView({ behavior: "smooth" })}
        >
          Replace Resume
        </Button>

      </div>

    </SectionCard>
  );
}