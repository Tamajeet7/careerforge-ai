import fs from "fs/promises";
import path from "path";

import pdfParse from "pdf-parse";
import mammoth from "mammoth";

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
  const buffer =
    await fs.readFile(filePath);

  const pdf =
    await pdfParse(buffer);

  return pdf.text;
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