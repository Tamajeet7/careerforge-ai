import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { getATS } from "../controllers/ats.controller";

const router = Router();

router.get("/", authenticate, getATS);

export default router;