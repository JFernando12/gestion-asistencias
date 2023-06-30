import mongoose from 'mongoose';

interface AttendanceAttrs {
  employee_id: string;
  employee_name: string;
  date: Date;
  punch_in: string;
  punch_out?: string;
}

interface AttendanceDoc extends mongoose.Document {
  employee_id: string;
  employee_name: string;
  date: Date;
  punch_in: string;
  punch_out?: string;
}

interface AttendanceModel extends mongoose.Model<AttendanceDoc> {
  build(attrs: AttendanceAttrs): AttendanceDoc;
}

const attendanceSchema = new mongoose.Schema(
  {
    employee_id: {
      type: String,
      required: true,
    },
    employee_name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    punch_in: {
      type: String,
      required: true,
    },
    punch_out: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

attendanceSchema.statics.build = (attrs: AttendanceAttrs) => {
  return new Attendance(attrs);
};

attendanceSchema.statics.batchCreate = async (attrs: AttendanceAttrs[]) => {
  return await Attendance.insertMany(attrs);
};

const Attendance = mongoose.model<AttendanceDoc, AttendanceModel>(
  'Attendance',
  attendanceSchema
);

export { Attendance };
