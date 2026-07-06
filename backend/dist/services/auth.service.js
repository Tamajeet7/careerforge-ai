"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getCurrentUser = getCurrentUser;
const prisma_1 = __importDefault(require("../config/prisma"));
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
async function registerUser(data) {
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await (0, hash_1.hashPassword)(data.password);
    const user = await prisma_1.default.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });
    return user;
}
async function loginUser(data) {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordCorrect = await (0, hash_1.comparePassword)(data.password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user.id);
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        accessToken,
    };
}
async function getCurrentUser(userId) {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });
    return user;
}
