import { Request, Response } from 'express';
import { Types } from 'mongoose';
import moment from 'moment';
import xlsx from 'xlsx';
import fs from 'fs';

import { Attendance } from '../models/attendance';
import response from '../network/response';

const create = async (req: Request, res: Response) => {
  try {
    const { employee_id, employee_name, date, punch_in, punch_out } = req.body;

    if (!employee_id) {
      response.error(req, res, 400, 'El ID de empleado es requerido.');
      return;
    }
    if (!employee_name) {
      response.error(req, res, 400, 'El nombre de empleado es requerido.');
      return;
    }
    if (!date) {
      response.error(req, res, 400, 'La fecha es requerida.');
      return;
    }
    if (!punch_in) {
      response.error(req, res, 400, 'La hora de entrada es requerida.');
      return;
    }
    const timeIn = moment(punch_in, 'HH:mm').format('HH:mm');
    
    let timeOut;
    if (punch_out) {
      timeOut = moment(punch_out, 'HH:mm').format('HH:mm');
    } else {
      timeOut = '';
    }

    if (moment(timeOut, 'HH:mm').isBefore(moment(timeIn, 'HH:mm'))) {
      response.error(req, res, 400, 'Hora de Salida debe ser mayor');
      return;
    }

    const attendance = Attendance.build({
      employee_id,
      employee_name,
      date,
      punch_in: timeIn,
      punch_out: timeOut,
    });
    await attendance.save();

    response.success(req, res, 201, attendance);
  } catch (error) {
    console.error(error);
    response.error(req, res, 500, 'Error al crear la asistencia.');
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const { employee_id } = req.query;
    let { offset, limit } = req.query; 

    let filter = {};
    if (employee_id) {
      filter = { employee_id };
    }

    let formatedOffset = 0;
    let formatedLimit = 100;
    if(offset) {
      formatedOffset = parseInt(offset as string);
    }
    if(limit) {
      formatedLimit = parseInt(limit as string);
    }

    const attendances = await Attendance.find(filter).skip(formatedOffset).limit(formatedLimit);
    const count = await Attendance.countDocuments();
    response.success(req, res, 200, attendances, '', {
      offset: formatedOffset,
      limit: formatedLimit ,
      count,
    });
  } catch (error) {
    console.error(error);
    response.error(req, res, 500, 'Error al obtener las asistencias.');
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const attendanceId = req.params.id;

    if (!Types.ObjectId.isValid(attendanceId)) {
      response.error(req, res, 400, 'El ID de asistencia no es válido.');
      return;
    }

    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      response.error(req, res, 404, 'Asistencia no encontrada.');
      return;
    }

    response.success(req, res, 200, attendance);
  } catch (error) {
    console.error(error);
    response.error(req, res, 500, 'Error al obtener la asistencia.');
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const attendanceId = req.params.id;
    const { employee_id, employee_name, date, punch_in, punch_out } = req.body;

    if (!employee_id) {
      response.error(req, res, 400, 'El ID de empleado es requerido.');
      return;
    }
    if (!employee_name) {
      response.error(req, res, 400, 'El nombre de empleado es requerido.');
      return;
    }
    if (!date) {
      response.error(req, res, 400, 'La fecha es requerida.');
      return;
    }
    if (!punch_in) {
      response.error(req, res, 400, 'La hora de entrada es requerida.');
      return;
    }
    const timeIn = moment(punch_in, 'HH:mm').format('HH:mm');

    let timeOut;
    if (punch_out) {
      timeOut = moment(punch_out, 'HH:mm').format('HH:mm');
    } else {
      timeOut = '';
    }

    if (moment(timeOut, 'HH:mm').isBefore(moment(timeIn, 'HH:mm'))) {
      response.error(req, res, 400, 'Hora de Salida debe ser mayor');
      return;
    }

    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      {
        employee_id,
        employee_name,
        date,
        punch_in,
        punch_out,
      },
      { new: true }
    );
    response.success(req, res, 200, attendance);
  } catch (error) {
    console.error(error);
    response.error(req, res, 500, 'Error al actualizar la asistencia.');
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const attendanceId = req.params.id;

    const attendance = await Attendance.findByIdAndDelete(attendanceId);
    response.success(req, res, 200, attendance, 'Asistencia eliminada.');
  } catch (error) {
    console.error(error);
    response.error(req, res, 500, 'Error al eliminar la asistencia.');
  }
};

const batchCreate = async (req: Request, res: Response) => {
  try {
    const filePath = req.file?.path;

    if (!filePath) {
      response.error(req, res, 400, 'No se ha proporcionado el archivo.');
      return;
    }

    // Verificar si el archivo es un archivo de Excel
    if (!filePath.endsWith('.xlsx')) {
      response.error(req, res, 400, 'El archivo no es un archivo de Excel válido.');
      return;
    }

    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { raw: false });

    if (jsonData.length < 1) {
      response.error(req, res, 400, 'El archivo Excel está vacío.');
      return;
    }

    // Obtener las cabeceras del archivo Excel
    const fileHeaders = Object.keys(jsonData[0]!);

    // Verificar si todas las cabeceras requeridas están presentes
    const requiredHeaders = ['Employee ID', 'Employee Name', 'Date', 'Punch In', 'Punch Out'];
    const missingHeaders = requiredHeaders.filter(header => !fileHeaders.includes(header));

    if (missingHeaders.length > 0) {
      response.error(req, res, 400, 'El archivo Excel no contiene las cabeceras requeridas.');
      return;
    }

    const attendances = jsonData.map((data: any) => {
      return {
        employee_id: data['Employee ID'],
        employee_name: data['Employee Name'],
        date: new Date(data['Date']),
        punch_in: data['Punch In'],
        punch_out: data['Punch Out'],
      };
    });

    const data = await Attendance.insertMany(attendances);
    // Eliminar excel
    fs.unlinkSync(filePath);

    response.success(req, res, 201, data, 'Asistencias creadas.');
  } catch (err) {
    console.error(err);
    response.error(req, res, 500, 'Error al crear las asistencias.');
  }
};

export default { create, getAll, getOne, update, remove, batchCreate };
