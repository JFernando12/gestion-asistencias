import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Attendance } from '../../models/attendance';

it('Create new Attendace', async () => {
  await request(app)
    .post('/api/attendances')
    .send({
      employee_id: 1,
      employee_name: 'Attendance prueba',
      date: new Date(),
      punch_in: '10:00',
      punch_out: '12:00',
    })
    .expect(201);

  const attendances = await Attendance.find({});
  expect(attendances.length).toEqual(1);
});

it('Get all Attendances', async () => {
  await request(app)
    .post('/api/attendances')
    .send({
      employee_id: 1,
      employee_name: 'Attendance prueba',
      date: new Date(),
      punch_in: '10:00',
      punch_out: '12:00',
    })
    .expect(201);

  await request(app)
    .post('/api/attendances')
    .send({
      employee_id: 2,
      employee_name: 'Attendance prueba',
      date: new Date(),
      punch_in: '10:00',
      punch_out: '12:00',
    })
    .expect(201);

  const response = await request(app)
    .get('/api/attendances')
    .send()
    .expect(200);

  expect(response.body.data.length).toEqual(2);
});

it('Get one Attendance', async () => {
  const attendance = await request(app)
    .post('/api/attendances')
    .send({
      employee_id: 1,
      employee_name: 'Attendance prueba',
      date: new Date(),
      punch_in: '10:00',
      punch_out: '12:00',
    })
    .expect(201);

  const attendanceResponse = await request(app)
    .get(`/api/attendances/${attendance.body.data.id}`)
    .send()
    .expect(200);

  expect(attendanceResponse.body.data.id).toEqual(attendance.body.data.id);
});

it('Update Attendance', async () => {
  const attendance = await request(app)
    .post('/api/attendances')
    .send({
      employee_id: 1,
      employee_name: 'Attendance prueba',
      date: new Date(),
      punch_in: '10:00',
      punch_out: '12:00',
    })
    .expect(201);

  const attendanceResponse = await request(app)
    .put(`/api/attendances/${attendance.body.data.id}`)
    .send({
      employee_id: 1,
      employee_name: 'Attendance prueba',
      date: new Date(),
      punch_in: '10:00',
      punch_out: '12:00',
    })
    .expect(200);

  expect(attendanceResponse.body.data.id).toEqual(attendance.body.data.id);
});

it('Delete Attendance', async () => {
  const attendance = await request(app)
    .post('/api/attendances')
    .send({
      employee_id: 1,
      employee_name: 'Attendance prueba',
      date: new Date(),
      punch_in: '10:00',
      punch_out: '12:00',
    })
    .expect(201);

  const attendanceResponse = await request(app)
    .delete(`/api/attendances/${attendance.body.data.id}`)
    .send()
    .expect(200);

  expect(attendanceResponse.body.data.id).toEqual(attendance.body.data.id);
});
