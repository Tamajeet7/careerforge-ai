"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = uploadResume;
exports.getMyResume = getMyResume;
exports.getATSScore = getATSScore;
const parser_1 = require("./parser");
const resume_service_1 = require("./resume.service");
const ats_1 = require("../ats");
async function uploadResume(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No resume uploaded",
            });
        }
        /*
        |--------------------------------------------------------------------------
        | Read Resume
        |--------------------------------------------------------------------------
        */
        const rawText = await (0, parser_1.readResume)(req.file.path);
        /*
        |--------------------------------------------------------------------------
        | Parse Resume
        |--------------------------------------------------------------------------
        */
        const parsed = (0, parser_1.parseResumeText)(rawText);
        /*
        |--------------------------------------------------------------------------
        | Save Resume
        |--------------------------------------------------------------------------
        */
        const resume = await (0, resume_service_1.saveResume)({
            userId: req.user.userId,
            name: parsed.contact.name,
            email: parsed.contact.email,
            phone: parsed.contact.phone,
            skills: parsed.skills,
            fileName: req.file.originalname,
            filePath: `uploads/${req.file.filename}`,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            pages: 1,
        });
        /*
        |--------------------------------------------------------------------------
        | ATS Analysis
        |--------------------------------------------------------------------------
        */
        const ats = (0, ats_1.calculateATS)(parsed);
        await (0, resume_service_1.updateResumeAnalytics)(req.user.userId, {
            atsScore: ats.score,
            resumeQuality: ats.metrics.resumeQuality,
            skillsMatch: ats.metrics.skillsMatch,
            aiConfidence: ats.confidence,
        });
        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            data: {
                resume,
                ats,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Resume upload failed",
        });
    }
}
async function getMyResume(req, res) {
    try {
        const resume = await (0, resume_service_1.getResume)(req.user.userId);
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }
        return res.json({
            success: true,
            data: {
                ...resume,
                fileUrl: `${req.protocol}://${req.get("host")}/${resume.filePath}`,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch resume",
        });
    }
}
async function getATSScore(req, res) {
    try {
        const resume = await (0, resume_service_1.getResume)(req.user.userId);
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }
        return res.json({
            success: true,
            data: {
                atsScore: resume.atsScore,
                resumeQuality: resume.resumeQuality,
                skillsMatch: resume.skillsMatch,
                aiConfidence: resume.aiConfidence,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch ATS score",
        });
    }
}
