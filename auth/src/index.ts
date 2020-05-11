import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not provided');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-service:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('auth-service connected to auth-db');
  } catch (e) {
    console.log(e);
  }

  app.listen(5000, () => {
    console.log('Auth service listening on PORT: 5000');
  });
};

start();
