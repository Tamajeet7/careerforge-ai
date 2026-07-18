"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static success(res, data, message = "Success") {
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    }
    static created(res, data, message = "Created successfully") {
        return res.status(201).json({
            success: true,
            message,
            data,
        });
    }
    static deleted(res, message = "Deleted successfully") {
        return res.status(200).json({
            success: true,
            message,
        });
    }
    static noContent(res) {
        return res.status(204).send();
    }
}
exports.ApiResponse = ApiResponse;
