import { Router } from "express";
import authRoutes from "./auth.routes";
import resumeRoutes from "./resume.routes";
import atsRoutes from "./ats.routes";

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