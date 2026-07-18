"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const ApiError_1 = require("../shared/errors/ApiError");
function errorHandler(error, req, res, next) {
    console.error(error);
    /*
    |--------------------------------------------------------------------------
    | Custom API Errors
    |--------------------------------------------------------------------------
    */
    if (error instanceof ApiError_1.ApiError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
    /*
    |--------------------------------------------------------------------------
    | Zod Validation
    |--------------------------------------------------------------------------
    */
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.flatten(),
        });
    }
    /*
    |--------------------------------------------------------------------------
    | Unknown Errors
    |--------------------------------------------------------------------------
    */
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}
