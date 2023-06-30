import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useCreateBatchAttendanceMutation } from '../store';

const AttendanceBatch = () => {
  const theme = useTheme();

  const [errors, setErrors] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const [createAttendanceBatch, { isLoading }] =
    useCreateBatchAttendanceMutation();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const { error } = await createAttendanceBatch(formData);

    if (error) {
      console.log('Error:', error);
      setErrors(error?.data?.message || 'Error al subir asistencias');
      return;
    }

    // Logic to clear the file input
    setFile(null);

    // Logic to redirect to the attendance list
    navigate('/lista asistencia');
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
        <Typography variant="h6" component="h2" align="center" gutterBottom>
          Carga el archivo de asistencias.
        </Typography>
        <Box
          m="15px"
          border={`2px solid ${theme.palette.primary.main}`}
          p="12px"
        >
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            required
            m="15px 15px 15px 15px"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || !file}
          mt="20px"
        >
          {isLoading ? 'Subiendo Archivo...' : 'Subir Archivo'}
        </Button>
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

export default AttendanceBatch;
