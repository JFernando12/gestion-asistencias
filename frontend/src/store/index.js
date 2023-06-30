import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import { globalReducer, setMode } from './slices/globalSlice';
import {
  useGetAttendancesQuery,
  useGetOneAttendanceQuery,
  useCreateAttendanceMutation,
  useCreateBatchAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
  attendanceApi,
} from './apis/attendanceApi';

const store = configureStore({
  reducer: {
    global: globalReducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(attendanceApi.middleware),
});
setupListeners(store.dispatch);

export {
  store,
  setMode,
  useGetAttendancesQuery,
  useGetOneAttendanceQuery,
  useCreateAttendanceMutation,
  useCreateBatchAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
};
