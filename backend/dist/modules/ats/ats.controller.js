"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getATS = void 0;
const shared_1 = require("../../shared");
const resume_1 = require("../resume");
const ats_service_1 = require("./ats.service");
const parser_1 = require("../resume/parser");
exports.getATS = (0, shared_1.asyncHandler)(async (req, res) => {
    const resume = await (0, resume_1.getResume)(req.user.userId);
    if (!resume)
        throw new shared_1.NotFoundError("Resume not found");
    const raw = await (0, parser_1.readResume)(resume.filePath);
    const parsed = (0, parser_1.parseResumeText)(raw);
    const ats = (0, ats_service_1.calculateATS)(parsed);
    return shared_1.ApiResponse.success(res, ats);
});
