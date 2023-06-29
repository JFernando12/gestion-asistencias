import { app } from './app';
import mongoose from 'mongoose';
import { PORT, MONGO_URI } from './config';

if (!MONGO_URI) {
  throw new Error('MONGO_URI must exist');
}

// Conexión a la base de datos MongoDB
mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
