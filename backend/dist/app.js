"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const attendanceRoute_1 = __importDefault(require("./routes/attendanceRoute"));
const app = (0, express_1.default)();
exports.app = app;
// Configuración de bodyParser para procesar solicitudes JSON
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Configuración de CORS para permitir peticiones desde cualquier origen
// app.use(cors());
// Ruta para las asistencias
app.use('/api/attendances', attendanceRoute_1.default);
