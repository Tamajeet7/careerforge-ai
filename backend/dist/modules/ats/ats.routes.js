"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const ats_controller_1 = require("./ats.controller");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authenticate, ats_controller_1.getATS);
exports.default = router;
