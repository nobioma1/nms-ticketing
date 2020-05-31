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
    console.log('auth-service connected to auth-db');
  } catch (e) {
    console.log(e);
  }

  app.listen(5000, () => {
    console.log('Auth Service listening on PORT: 5000');
  });
};

start();
