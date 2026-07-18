import ResumeUploader from "./ResumeUploader";

interface ReplaceSectionProps {
  onUploadSuccess: () => void;
}

export default function ReplaceSection({
  onUploadSuccess,
}: ReplaceSectionProps) {
  return (
    <ResumeUploader
      mode="replace"
      onUploadSuccess={onUploadSuccess}
    />
  );
}