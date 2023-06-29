"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const success = (req, res, status, data, message) => {
    let statusCode = status || 200;
    let statusMessage = message || '';
    res.status(statusCode).json({
        status: status,
        message: statusMessage,
        data,
    });
};
const error = (req, res, status, message, data) => {
    let statusCode = status || 500;
    let statusMessage = message || 'Internal server error';
    res.status(statusCode).json({
        status: status,
        message: statusMessage,
        data,
    });
};
exports.default = { success, error };
