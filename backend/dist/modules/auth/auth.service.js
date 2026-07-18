"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getCurrentUser = getCurrentUser;
const auth_repository_1 = require("./auth.repository");
const hash_1 = require("../../shared/utils/hash");
const jwt_1 = require("../../shared/utils/jwt");
const errors_1 = require("../../shared/errors");
async function registerUser(data) {
    const existingUser = await (0, auth_repository_1.findUserByEmail)(data.email);
    if (existingUser) {
        throw new errors_1.ConflictError("User already exists");
    }
    const hashedPassword = await (0, hash_1.hashPassword)(data.password);
    await (0, auth_repository_1.createUser)(data.name, data.email, hashedPassword);
    return loginUser({
        email: data.email,
        password: data.password,
    });
}
async function loginUser(data) {
    const user = await (0, auth_repository_1.findUserByEmail)(data.email);
    if (!user) {
        throw new errors_1.UnauthorizedError("Invalid email or password");
    }
    const valid = await (0, hash_1.comparePassword)(data.password, user.password);
    if (!valid) {
        throw new errors_1.UnauthorizedError("Invalid email or password");
    }
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        accessToken: (0, jwt_1.generateAccessToken)(user.id),
    };
}
async function getCurrentUser(userId) {
    return (0, auth_repository_1.findUserById)(userId);
}
