import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { useCreateAttendanceMutation } from '../store';

const AttendanceForm = () => {
  const theme = useTheme();

  const [errors, setErrors] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [punchIn, setPunchIn] = useState('');
  const [punchOut, setPunchOut] = useState('');
  const navigate = useNavigate();

  const [createAttendance, { isLoading }] = useCreateAttendanceMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await createAttendance({
      employee_id: employeeId,
      employee_name: employeeName,
      date,
      punch_in: punchIn,
      punch_out: punchOut,
    });

    if (error) {
      console.log('Error:', error);
      setErrors(error?.data?.message || 'Error al crear asistencia');
      return;
    }

    setEmployeeId('');
    setEmployeeName('');
    setDate('');
    setPunchIn('');
    setPunchOut('');

    navigate('/asistencias');
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
            type="number"
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
            {isLoading ? 'Registrando Asistencia...' : 'Regitrar Asistencia'}
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

export default AttendanceForm;
