"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
const MONGO_URI = process.env.MONGO_URI;
exports.MONGO_URI = MONGO_URI;
