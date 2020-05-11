import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/currentUser';
import { signIn } from './routes/signin';
import { signOut } from './routes/signout';
import { signUp } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true); // because traffic is coming from NGINX(a proxy)
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signIn);
app.use(signOut);
app.use(signUp);
app.use(errorHandler);

app.all('*', async () => {
  throw new NotFoundError();
});

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
