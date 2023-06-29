import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import attendanceRoutes from './routes/attendanceRoute';

const app = express();

// Configuración de bodyParser para procesar solicitudes JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Configuración de CORS para permitir peticiones desde cualquier origen
// app.use(cors());

// Ruta para las asistencias
app.use('/api/attendances', attendanceRoutes);

export { app };
