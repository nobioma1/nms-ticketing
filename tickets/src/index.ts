import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not provided');
  }

  if (!process.env.MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI not provided');
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('tickets-service connected to tickets-db');
  } catch (e) {
    console.log(e);
  }

  app.listen(5001, () => {
    console.log('Tickets service listening on PORT: 5001');
  });
};

start();
