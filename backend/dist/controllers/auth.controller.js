"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.me = me;
const validation_1 = require("../utils/validation");
const auth_service_1 = require("../services/auth.service");
const validation_2 = require("../utils/validation");
const auth_service_2 = require("../services/auth.service");
const auth_service_3 = require("../services/auth.service");
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
async function login(req, res) {
    const data = validation_2.loginSchema.parse(req.body);
    const result = await (0, auth_service_2.loginUser)(data);
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
    });
}
async function me(req, res) {
    const user = await (0, auth_service_3.getCurrentUser)(req.user.userId);
    res.status(200).json({
        success: true,
        data: user,
    });
}
