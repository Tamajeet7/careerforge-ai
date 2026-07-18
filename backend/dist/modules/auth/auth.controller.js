"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const shared_1 = require("../../shared");
const validators_1 = require("./validators");
const auth_service_1 = require("./auth.service");
const errors_1 = require("../../shared/errors");
exports.register = (0, shared_1.asyncHandler)(async (req, res) => {
    const data = validators_1.registerSchema.parse(req.body);
    const result = await (0, auth_service_1.registerUser)(data);
    return shared_1.ApiResponse.created(res, result, "Registration successful");
});
exports.login = (0, shared_1.asyncHandler)(async (req, res) => {
    const data = validators_1.loginSchema.parse(req.body);
    const result = await (0, auth_service_1.loginUser)(data);
    return shared_1.ApiResponse.success(res, result, "Login successful");
});
exports.me = (0, shared_1.asyncHandler)(async (req, res) => {
    const user = await (0, auth_service_1.getCurrentUser)(req.user.userId);
    if (!user)
        throw new errors_1.NotFoundError("User not found");
    return shared_1.ApiResponse.success(res, user);
});
