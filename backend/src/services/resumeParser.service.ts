import pdfParse from "pdf-parse";

export async function parseResume(buffer: Buffer) {
  const pdf = await pdfParse(buffer);
  return pdf.text;
}