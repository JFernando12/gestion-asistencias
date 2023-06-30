import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import {
  useGetOneAttendanceQuery,
  useUpdateAttendanceMutation,
} from '../store';

const AttendanceUpdate = () => {
  const theme = useTheme();
  const [errors, setErrors] = useState('');	
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [punchIn, setPunchIn] = useState('');
  const [punchOut, setPunchOut] = useState('');

  const navigate = useNavigate();
  // Obtener la URL actual
  const currentURL = window.location.href;
  // Extraer el ID de la URL
  const urlParts = currentURL.split('/');
  const attendanceId = urlParts[urlParts.length - 1];
  const { data } = useGetOneAttendanceQuery(attendanceId);

  useEffect(() => {
    let formattedDate;
    if (data?.data.date) {
      const inputDate = new Date(data?.data.date);
      formattedDate = inputDate.toISOString().split('T')[0];
    }

    // Add leading zeros if necessary
    let transformedPunchIn;
    if (data?.data.punch_in) {
      const [hours, minutes] = data?.data.punch_in.split(':');
      transformedPunchIn = `${hours.padStart(2, '0')}:${minutes}`;
    }

    setEmployeeId(data?.data.employee_id || '');
    setEmployeeName(data?.data.employee_name || '');
    setDate(formattedDate || '');
    setPunchIn(transformedPunchIn || '');
    setPunchOut(data?.data.punch_out || '');
  }, [data]);

  const [updateAttendance, { isLoading }] = useUpdateAttendanceMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await updateAttendance({
      id: data?.data.id,
      attendance: {
        employee_id: employeeId,
        employee_name: employeeName,
        date,
        punch_in: punchIn,
        punch_out: punchOut,
      },
    });

    if (error) {
      setErrors(error?.data?.message || 'Error al actualizar asistencia');
      console.log('Error:', error);
      return;
    }

    // Lógica para limpiar el formulario
    setEmployeeId('');
    setEmployeeName('');
    setDate('');
    setPunchIn('');
    setPunchOut('');

    // Lógica para redireccionar a la lista de asistencias
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="70vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="400px"
        mt="50px"
        border={`1px solid ${theme.palette.primary.main}`}
        borderRadius="10px"
        p="20px"
        boxShadow={theme.shadows[3]}
      >
        <>
          <TextField
            id="employee_id"
            label="ID Empleado"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            id="employee_name"
            label="Nombre"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
          <Box display="flex" gap="5px">
            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Fecha:
            </Typography>
            <TextField
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />
          </Box>
          <Box display="flex" gap="5px">
            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Hora de Entrada:
            </Typography>
            <TextField
              id="punch_in"
              type="time"
              value={punchIn}
              onChange={(e) => setPunchIn(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />
          </Box>
          <Box display="flex" gap="5px">
            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Hora de Salida:
            </Typography>
            <TextField
              id="punch_out"
              type="time"
              value={punchOut}
              onChange={(e) => setPunchOut(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            mt="20px"
          >
            {isLoading ? 'Actualizando Asistencia...' : 'Actualizar Asistencia'}
          </Button>
        </>
        {errors.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="20px"
          >
            <Typography key={errors} color="error">
              {errors}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AttendanceUpdate;
