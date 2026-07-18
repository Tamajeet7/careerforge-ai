import {
  useCallback,
  useState,
} from "react";

import { useDropzone } from "react-dropzone";

import {
  RefreshCw,
  UploadCloud,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  uploadResume,
} from "../resume.service";

import {
  Button,
  Spinner,
} from "../../ui";

interface ResumeUploaderProps {
  onUploadSuccess?: () => void;

  mode?: "upload" | "replace";
}

export default function ResumeUploader({
  onUploadSuccess,
  mode = "upload",
}: ResumeUploaderProps) {
  const [uploading, setUploading] =
    useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        return;
      }

      setUploading(true);

      try {
        const formData = new FormData();

        formData.append(
          "resume",
          acceptedFiles[0]
        );

        await uploadResume(formData);

        toast.success(
          mode === "replace"
            ? "Resume replaced successfully!"
            : "Resume uploaded successfully!"
        );

        onUploadSuccess?.();
      } catch (error) {
        console.error(error);

        toast.error(
          mode === "replace"
            ? "Resume replacement failed"
            : "Resume upload failed"
        );
      } finally {
        setUploading(false);
      }
    },
    [mode, onUploadSuccess]
  );

  const {
    getRootProps,
    getInputProps,
    open,
  } = useDropzone({
    multiple: false,

    noClick: true,

    accept: {
      "application/pdf": [".pdf"],
    },

    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="
        rounded-3xl
        border-2
        border-dashed
        border-slate-700
        bg-slate-900
        p-10
        text-center
        transition-all
        duration-300
        hover:border-blue-500
      "
    >
      <input {...getInputProps()} />

      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10">

        {mode === "replace" ? (
          <RefreshCw
            size={42}
            className="text-blue-400"
          />
        ) : (
          <UploadCloud
            size={42}
            className="text-blue-400"
          />
        )}

      </div>

      <h2 className="text-2xl font-bold text-white">
        {mode === "replace"
          ? "Replace Resume"
          : "Upload Resume"}
      </h2>

      <p className="mt-3 text-slate-400">
        {mode === "replace"
          ? "Upload a newer version of your resume."
          : "Drag & drop your PDF here or browse your files."}
      </p>

      <div className="mt-8 flex justify-center">

        <Button
          onClick={open}
          loading={uploading}
          leftIcon={
            !uploading &&
            (mode === "replace" ? (
              <RefreshCw size={18} />
            ) : (
              <UploadCloud size={18} />
            ))
          }
        >
          {uploading
            ? "Uploading..."
            : mode === "replace"
            ? "Replace Resume"
            : "Choose Resume"}
        </Button>

      </div>

      {uploading && (
        <div className="mt-6 flex items-center justify-center gap-3 text-blue-400">

          <Spinner />

          <span>Uploading your resume...</span>

        </div>
      )}

    </div>
  );
}