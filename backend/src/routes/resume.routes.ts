import { Router } from "express";
import multer from "multer";

import { uploadResume } from "../controllers/resume.controller";
import { authenticate } from "../middleware/auth.middleware";
import { getMyResume } from "../controllers/resume.controller";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  authenticate,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/me",
  authenticate,
  getMyResume
);

export default router;