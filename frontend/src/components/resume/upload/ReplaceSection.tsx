import ResumeUploader from "./ResumeUploader";

interface ReplaceSectionProps {
  onUploadSuccess: () => void;
}

export default function ReplaceSection({
  onUploadSuccess,
}: ReplaceSectionProps) {
  return (
    <div id="replace-section">
      <ResumeUploader
        mode="replace"
        onUploadSuccess={onUploadSuccess}
      />
    </div>
  );
}