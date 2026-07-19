import { Router } from "express";

import {
  uploadResume,
  getMyResume,
  handleGetParsedResume as getParsedResume,
  getATSScore,
} from "./resume.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { upload } from "../../middleware/upload.middleware";

const router = Router();

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

router.get(
  "/parsed",
  authenticate,
  getParsedResume
);

router.get(
  "/ats",
  authenticate,
  getATSScore
);

export default router;