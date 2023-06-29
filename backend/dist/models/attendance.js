"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const attendanceSchema = new mongoose_1.default.Schema({
    employee_id: {
        type: String,
        required: true,
    },
    employee_name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    punch_in: {
        type: String,
        required: true,
    },
    punch_out: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
attendanceSchema.statics.build = (attrs) => {
    return new Attendance(attrs);
};
attendanceSchema.statics.batchCreate = (attrs) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Attendance.insertMany(attrs);
});
const Attendance = mongoose_1.default.model('Attendance', attendanceSchema);
exports.Attendance = Attendance;
