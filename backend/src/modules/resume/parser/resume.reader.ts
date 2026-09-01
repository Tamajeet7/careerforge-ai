import fs from "fs/promises";
import path from "path";
import mammoth from "mammoth";

/**
 * Reads a resume file and returns its plain text content.
 * Supports PDF and DOCX formats.
 *
 * For PDFs, we use pdfjs-dist instead of pdf-parse because it correctly
 * handles font encodings that would otherwise produce garbled text
 * (missing spaces, control characters, etc.).
 */
export async function readResume(
  filePath: string
): Promise<string> {
  const extension = path
    .extname(filePath)
    .toLowerCase();

  switch (extension) {
    case ".pdf":
      return readPDF(filePath);

    case ".docx":
      return readDOCX(filePath);

    default:
      throw new Error(
        `Unsupported resume format: ${extension}`
      );
  }
}

async function readPDF(
  filePath: string
): Promise<string> {
  try {
    return await readPDFWithPdfjsDist(filePath);
  } catch (err) {
    console.warn("[PDF Reader] pdfjs-dist failed, falling back to pdf-parse:", err);
    return readPDFWithPdfParse(filePath);
  }
}

/**
 * Primary PDF reader using pdfjs-dist.
 * Preserves proper word spacing by rendering each text item and adding
 * a space when items are not horizontally adjacent on the same line.
 */
async function readPDFWithPdfjsDist(
  filePath: string
): Promise<string> {
  // Use dynamic import to avoid top-level ESM issues
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

  const buffer = await fs.readFile(filePath);
  const uint8Array = new Uint8Array(buffer);

  const loadingTask = pdfjsLib.getDocument({
    data: uint8Array,
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    let pageText = "";
    let lastY: number | null = null;
    let lastX: number | null = null;
    let lastWidth = 0;

    for (const item of textContent.items) {
      if (!("str" in item)) continue;

      const { str, transform } = item as {
        str: string;
        transform: number[];
        width: number;
        height: number;
      };

      const x = transform[4];
      const y = transform[5];

      if (lastY !== null && Math.abs(y - lastY) > 2) {
        // New line
        pageText += "\n";
      } else if (lastX !== null && x > lastX + lastWidth + 1) {
        // Same line but gap between items — add a space
        pageText += " ";
      }

      pageText += str;
      lastY = y;
      lastX = x;
      lastWidth = (item as any).width ?? 0;
    }

    pages.push(pageText);
  }

  return pages.join("\n\n");
}

/**
 * Fallback PDF reader using pdf-parse (handles most standard PDFs).
 */
async function readPDFWithPdfParse(
  filePath: string
): Promise<string> {
  const pdfParse = (await import("pdf-parse")).default;
  const buffer = await fs.readFile(filePath);
  const result = await pdfParse(buffer);
  return result.text;
}

async function readDOCX(
  filePath: string
): Promise<string> {
  const result =
    await mammoth.extractRawText({
      path: filePath,
    });

  return result.value;
}