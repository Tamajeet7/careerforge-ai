"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.createUser = createUser;
const prisma_1 = __importDefault(require("../../config/prisma"));
async function findUserByEmail(email) {
    return prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
}
async function findUserById(id) {
    return prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });
}
async function createUser(name, email, password) {
    return prisma_1.default.user.create({
        data: {
            name,
            email,
            password,
        },
    });
}
