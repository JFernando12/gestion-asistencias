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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const attendance_1 = require("../../models/attendance");
it('Create new Attendace', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/attendances')
        .send({
        employee_id: 1,
        employee_name: 'Attendance prueba',
        date: new Date(),
        punch_in: '10:00',
        punch_out: '12:00',
    })
        .expect(201);
    const attendances = yield attendance_1.Attendance.find({});
    expect(attendances.length).toEqual(1);
}));
it('Get all Attendances', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/attendances')
        .send({
        employee_id: 1,
        employee_name: 'Attendance prueba',
        date: new Date(),
        punch_in: '10:00',
        punch_out: '12:00',
    })
        .expect(201);
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/attendances')
        .send({
        employee_id: 2,
        employee_name: 'Attendance prueba',
        date: new Date(),
        punch_in: '10:00',
        punch_out: '12:00',
    })
        .expect(201);
    const response = yield (0, supertest_1.default)(app_1.app)
        .get('/api/attendances')
        .send()
        .expect(200);
    expect(response.body.data.length).toEqual(2);
}));
it('Get one Attendance', () => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = yield (0, supertest_1.default)(app_1.app)
        .post('/api/attendances')
        .send({
        employee_id: 1,
        employee_name: 'Attendance prueba',
        date: new Date(),
        punch_in: '10:00',
        punch_out: '12:00',
    })
        .expect(201);
    const attendanceResponse = yield (0, supertest_1.default)(app_1.app)
        .get(`/api/attendances/${attendance.body.data.id}`)
        .send()
        .expect(200);
    expect(attendanceResponse.body.data.id).toEqual(attendance.body.data.id);
}));
it('Update Attendance', () => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = yield (0, supertest_1.default)(app_1.app)
        .post('/api/attendances')
        .send({
        employee_id: 1,
        employee_name: 'Attendance prueba',
        date: new Date(),
        punch_in: '10:00',
        punch_out: '12:00',
    })
        .expect(201);
    const attendanceResponse = yield (0, supertest_1.default)(app_1.app)
        .put(`/api/attendances/${attendance.body.data.id}`)
        .send({
        employee_id: 1,
        employee_name: 'Attendance prueba',
        date: new Date(),
        punch_in: '10:00',
        punch_out: '12:00',
    })
        .expect(200);
    expect(attendanceResponse.body.data.id).toEqual(attendance.body.data.id);
}));
it('Delete Attendance', () => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = yield (0, supertest_1.default)(app_1.app)
        .post('/api/attendances')
        .send({
        employee_id: 1,
        employee_name: 'Attendance prueba',
        date: new Date(),
        punch_in: '10:00',
        punch_out: '12:00',
    })
        .expect(201);
    const attendanceResponse = yield (0, supertest_1.default)(app_1.app)
        .delete(`/api/attendances/${attendance.body.data.id}`)
        .send()
        .expect(200);
    expect(attendanceResponse.body.data.id).toEqual(attendance.body.data.id);
}));
