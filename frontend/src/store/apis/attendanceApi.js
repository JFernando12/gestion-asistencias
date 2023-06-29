import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const attendanceApi = createApi({
  reducerPath: 'attendance',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getAttendances: builder.query({
      providesTags: (result, error) => {
        const tags = result.data.map((attendance) => {
          return { type: 'Attendance', id: attendance.id };
        });
        tags.push({ type: 'Attendance', id: 'LIST' });
        return tags;
      },
      query: () => '/attendances',
    }),
    getOneAttendance: builder.query({
      providesTags: (result, error) => {
        return [{ type: 'Attendance', id: result.data.id }];
      },
      query: (id) => `/attendances/${id}`,
    }),
    createAttendance: builder.mutation({
      invalidatesTags: (result, error, attendance) => {
        return [{ type: 'Attendance', id: 'LIST' }];
      },
      query: (attendance) => ({
        url: '/attendances',
        method: 'POST',
        body: attendance,
      }),
    }),
    createBatchAttendance: builder.mutation({
      invalidatesTags: (result, error, attendance) => {
        return [{ type: 'Attendance', id: 'LIST' }];
      },
      query: (attendance) => ({
        url: '/attendances/batch',
        method: 'POST',
        body: attendance,
      }),
    }),
    updateAttendance: builder.mutation({
      invalidatesTags: (result, error, { id }) => {
        return [{ type: 'Attendance', id }];
      },
      query: ({ id, attendance }) => ({
        url: `/attendances/${id}`,
        method: 'PUT',
        body: attendance,
      }),
    }),
    deleteAttendance: builder.mutation({
      invalidatesTags: (result, error, id) => {
        return [{ type: 'Attendance', id }];
      },
      query: (id) => ({
        url: `/attendances/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAttendancesQuery,
  useGetOneAttendanceQuery,
  useCreateAttendanceMutation,
  useCreateBatchAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceApi;

export { attendanceApi };
