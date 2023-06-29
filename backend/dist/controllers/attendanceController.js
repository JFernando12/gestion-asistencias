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
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const attendance_1 = require("../models/attendance");
const response_1 = __importDefault(require("../network/response"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employee_id, employee_name, date, punch_in, punch_out } = req.body;
        const timeIn = (0, moment_1.default)(punch_in, 'HH:mm').format('HH:mm');
        let timeOut;
        if (punch_out) {
            timeOut = (0, moment_1.default)(punch_out, 'HH:mm').format('HH:mm');
        }
        else {
            timeOut = 'pendiente';
        }
        const attendance = attendance_1.Attendance.build({
            employee_id,
            employee_name,
            date,
            punch_in: timeIn,
            punch_out: timeOut,
        });
        yield attendance.save();
        response_1.default.success(req, res, 201, attendance);
    }
    catch (error) {
        console.error(error);
        response_1.default.error(req, res, 500, 'Error al crear la asistencia.');
    }
});
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employee_id } = req.query; // Obtener el valor del parámetro employee_id de la solicitud
        let filter = {}; // Filtro inicial sin ninguna condición
        if (employee_id) {
            filter = { employee_id }; // Si se proporciona employee_id, se añade como condición al filtro
        }
        const attendances = yield attendance_1.Attendance.find(filter);
        response_1.default.success(req, res, 200, attendances);
    }
    catch (error) {
        console.error(error);
        response_1.default.error(req, res, 500, 'Error al obtener las asistencias.');
    }
});
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceId = req.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(attendanceId)) {
            response_1.default.error(req, res, 400, 'El ID de asistencia no es válido.');
            return;
        }
        const attendance = yield attendance_1.Attendance.findById(attendanceId);
        if (!attendance) {
            response_1.default.error(req, res, 404, 'Asistencia no encontrada.');
            return;
        }
        response_1.default.success(req, res, 200, attendance);
    }
    catch (error) {
        console.error(error);
        response_1.default.error(req, res, 500, 'Error al obtener la asistencia.');
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceId = req.params.id;
        const { employee_id, employee_name, date, punch_in, punch_out } = req.body;
        const attendance = yield attendance_1.Attendance.findByIdAndUpdate(attendanceId, {
            employee_id,
            employee_name,
            date,
            punch_in,
            punch_out,
        }, { new: true });
        response_1.default.success(req, res, 200, attendance);
    }
    catch (error) {
        console.error(error);
        response_1.default.error(req, res, 500, 'Error al actualizar la asistencia.');
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceId = req.params.id;
        const attendance = yield attendance_1.Attendance.findByIdAndDelete(attendanceId);
        response_1.default.success(req, res, 200, attendance, 'Asistencia eliminada.');
    }
    catch (error) {
        console.error(error);
        response_1.default.error(req, res, 500, 'Error al eliminar la asistencia.');
    }
});
const batchCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (!filePath) {
            response_1.default.error(req, res, 400, 'No se ha proporcionado el archivo.');
            return;
        }
        const workbook = xlsx_1.default.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx_1.default.utils.sheet_to_json(worksheet, { raw: false });
        const attendances = jsonData.map((data) => {
            return {
                employee_id: data['Employee ID'],
                employee_name: data['Employee Name'],
                date: new Date(data['Date']),
                punch_in: data['Punch In'],
                punch_out: data['Punch Out'],
            };
        });
        yield attendance_1.Attendance.insertMany(attendances);
        // Eliminar excel
        fs_1.default.unlinkSync(filePath);
        response_1.default.success(req, res, 201, 'Asistencias creadas exitosamente.');
    }
    catch (err) {
        console.error(err);
        response_1.default.error(req, res, 500, 'Error al crear las asistencias.');
    }
});
exports.default = { create, getAll, getOne, update, remove, batchCreate };
