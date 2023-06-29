"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const attendanceController_1 = __importDefault(require("../controllers/attendanceController"));
const router = express_1.default.Router();
// Configuración de Multer para almacenar archivos Excel
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// Ruta para crear una asistencia
router.post('/', attendanceController_1.default.create);
// Ruta para obtener todas las asistencias
router.get('/', attendanceController_1.default.getAll);
// Ruta para obtener una asistencia por su ID
router.get('/:id', attendanceController_1.default.getOne);
// Ruta para actualizar una asistencia
router.put('/:id', attendanceController_1.default.update);
// Ruta para eliminar una asistencia
router.delete('/:id', attendanceController_1.default.remove);
// Ruta para la creación en batch desde un archivo Excel
router.post('/batch', upload.single('file'), attendanceController_1.default.batchCreate);
exports.default = router;
