"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const ApiError_1 = require("./ApiError");
class ConflictError extends ApiError_1.ApiError {
    constructor(message = "Conflict") {
        super(409, message);
    }
}
exports.ConflictError = ConflictError;
