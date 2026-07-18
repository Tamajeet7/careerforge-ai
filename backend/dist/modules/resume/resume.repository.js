"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertResume = upsertResume;
exports.findResumeByUserId = findResumeByUserId;
exports.updateResumeAnalytics = updateResumeAnalytics;
exports.removeResume = removeResume;
const prisma_1 = __importDefault(require("../../config/prisma"));
async function upsertResume(data) {
    return prisma_1.default.resume.upsert({
        where: {
            userId: data.userId,
        },
        update: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            skills: data.skills,
            fileName: data.fileName,
            filePath: data.filePath,
            fileSize: data.fileSize,
            mimeType: data.mimeType,
            pages: data.pages,
        },
        create: {
            userId: data.userId,
            title: "My Resume",
            name: data.name,
            email: data.email,
            phone: data.phone,
            skills: data.skills,
            fileName: data.fileName,
            filePath: data.filePath,
            fileSize: data.fileSize,
            mimeType: data.mimeType,
            pages: data.pages,
        },
    });
}
async function findResumeByUserId(userId) {
    return prisma_1.default.resume.findUnique({
        where: {
            userId,
        },
    });
}
async function updateResumeAnalytics(userId, analytics) {
    return prisma_1.default.resume.update({
        where: {
            userId,
        },
        data: analytics,
    });
}
async function removeResume(userId) {
    return prisma_1.default.resume.delete({
        where: {
            userId,
        },
    });
}
