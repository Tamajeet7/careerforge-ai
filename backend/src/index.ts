import { Router } from "express";

import { authRoutes } from "./modules/auth";
import { resumeRoutes } from "./modules/resume";
import { atsRoutes } from "./modules/ats";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "CareerForge Backend Running 🚀",
  });
});

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);
router.use("/ats", atsRoutes);

export default router;