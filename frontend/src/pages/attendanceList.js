import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../components/Header';
import { useGetAttendancesQuery, useDeleteAttendanceMutation } from '../store';

const AttendanceList = () => {
  const navigate = useNavigate();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { data, isLoading: isLoadingList } = useGetAttendancesQuery();
  const [deleteAttendance] = useDeleteAttendanceMutation();
  const theme = useTheme();

  const columns = [
    {
      field: 'employee_id',
      headerName: 'Empleado ID',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'employee_name',
      headerName: 'Nombre',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'date',
      headerName: 'Fecha',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        let formattedDate;
        if (params.value) {
          const inputDate = new Date(params.value);
          formattedDate = inputDate.toISOString().split('T')[0];
        }
        return formattedDate;
      },
      sortable: false,
    },
    {
      field: 'punch_in',
      headerName: 'Hora Entrada',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'punch_out',
      headerName: 'Hora Salida',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const handleEdit = () => {
          // Lógica para editar el registro
          navigate('/attendance/update/' + params.row.id);
        };

        const handleDelete = async () => {
          // Lógica para eliminar el registro
          try {
            setIsLoadingDelete(true);
            const { error } = await deleteAttendance(params.row.id);

            if (error) {
              console.log('Error:', error);
              setIsLoadingDelete(false);
              return;
            }

            setIsLoadingDelete(false);
          } catch (error) {
            setIsLoadingDelete(false);
          }
        };

        return (
          <>
            <Button
              onClick={handleEdit}
              startIcon={<Edit />}
              color="secondary"
              disabled={isLoadingDelete}
            >
              Editar
            </Button>
            <Button
              onClick={handleDelete}
              startIcon={<Delete />}
              color="secondary"
              disabled={isLoadingDelete}
            >
              Eliminar
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Asistencias" />
      <Box
        mt="40px"
        height="60vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderColor: theme.palette.primary[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoadingList}
          getRowId={(row) => row.id}
          rows={data?.data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default AttendanceList;
