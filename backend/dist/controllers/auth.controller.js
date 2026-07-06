"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const validation_1 = require("../utils/validation");
const auth_service_1 = require("../services/auth.service");
async function register(req, res) {
    const data = validation_1.registerSchema.parse(req.body);
    const user = await (0, auth_service_1.registerUser)(data);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
}
