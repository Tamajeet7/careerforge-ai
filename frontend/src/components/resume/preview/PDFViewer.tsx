import { useState } from "react";
import { Document, Page} from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

interface PDFViewerProps {
  file: string;
}

export default function PDFViewer({
  file,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);

  const [scale, setScale] = useState(1);

  function onLoadSuccess({
    numPages,
  }: {
    numPages: number;
  }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onLoadError(error: Error) {
    console.error("PDF Load Error:", error);
  }

  function previousPage() {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }

  function nextPage() {
    setPageNumber((prev) =>
      Math.min(prev + 1, numPages)
    );
  }

  return (
    <div className="flex flex-col">

      {/* Toolbar */}

      <div className="mb-5 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-3">

        <div className="flex items-center gap-3">

          <button
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="rounded-lg border border-slate-700 p-2 transition hover:border-blue-500 disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-sm text-slate-300">
            Page {pageNumber} of {numPages || 1}
          </span>

          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className="rounded-lg border border-slate-700 p-2 transition hover:border-blue-500 disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              setScale((s) => Math.max(0.7, s - 0.1))
            }
            className="rounded-lg border border-slate-700 p-2 transition hover:border-blue-500"
          >
            <ZoomOut size={18} />
          </button>

          <span className="w-14 text-center text-sm text-slate-300">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={() =>
              setScale((s) => Math.min(2.5, s + 0.1))
            }
            className="rounded-lg border border-slate-700 p-2 transition hover:border-blue-500"
          >
            <ZoomIn size={18} />
          </button>

        </div>

      </div>

      {/* PDF */}

      <div className="flex justify-center overflow-auto rounded-2xl border border-slate-800 bg-slate-950 p-6">

        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading={
            <div className="py-24 text-slate-400">
              Loading PDF...
            </div>
          }
          error={
            <div className="py-24 text-red-400">
              Failed to load PDF.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderAnnotationLayer
            renderTextLayer
          />
        </Document>

      </div>

    </div>
  );
}