import express from 'express';
import multer from 'multer';
import Attendance from '../controllers/attendanceController';

const router = express.Router();

// Configuración de Multer para almacenar archivos Excel
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Ruta para crear una asistencia
router.post('/', Attendance.create);

// Ruta para obtener todas las asistencias
router.get('/', Attendance.getAll);

// Ruta para obtener una asistencia por su ID
router.get('/:id', Attendance.getOne);

// Ruta para actualizar una asistencia
router.put('/:id', Attendance.update);

// Ruta para eliminar una asistencia
router.delete('/:id', Attendance.remove);

// Ruta para la creación en batch desde un archivo Excel
router.post('/batch', upload.single('file'), Attendance.batchCreate);

export default router;
