"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./modules/auth");
const resume_1 = require("./modules/resume");
const ats_1 = require("./modules/ats");
const router = (0, express_1.Router)();
router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "CareerForge Backend Running 🚀",
    });
});
router.use("/auth", auth_1.authRoutes);
router.use("/resume", resume_1.resumeRoutes);
router.use("/ats", ats_1.atsRoutes);
exports.default = router;
