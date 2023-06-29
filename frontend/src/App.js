import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { themeSettings } from './theme';
import Layout from './pages/layout';
import AttendanceList from './pages/attendanceList';
import AttendanceForm from './pages/attendanceForm';
import AttendanceUpdate from './pages/attendanceUpdate';
import AttendanceBatch from './pages/attendanceBatch';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Navigate to="/lista asistencia" replace></Navigate>}
              ></Route>
              <Route
                exact
                path="/lista asistencia"
                element={<AttendanceList />}
              />
              <Route
                exact
                path="/nueva asistencia"
                element={<AttendanceForm />}
              />
              <Route
                exact
                path="/subir por lote"
                element={<AttendanceBatch />}
              />
              <Route
                exact
                path="/attendance/update/:id"
                element={<AttendanceUpdate />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
