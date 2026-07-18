"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readResume = readResume;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
async function readResume(filePath) {
    const extension = path_1.default
        .extname(filePath)
        .toLowerCase();
    switch (extension) {
        case ".pdf":
            return readPDF(filePath);
        case ".docx":
            return readDOCX(filePath);
        default:
            throw new Error(`Unsupported resume format: ${extension}`);
    }
}
async function readPDF(filePath) {
    const buffer = await promises_1.default.readFile(filePath);
    const pdf = await (0, pdf_parse_1.default)(buffer);
    return pdf.text;
}
async function readDOCX(filePath) {
    const result = await mammoth_1.default.extractRawText({
        path: filePath,
    });
    return result.value;
}
