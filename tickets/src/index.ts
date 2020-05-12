import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  try {
    await mongoose.connect('mongodb://tickets-mongo-service:27017/tickets', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('tickets-service connected to tickets-db');
  } catch (e) {
    console.log(e);
  }

  app.listen(5001, () => {
    console.log('Auth service listening on PORT: 5001');
  });
};

start();
