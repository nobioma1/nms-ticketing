import { errorHandler, NotFoundError } from '@nms-ticketing/common';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';

import { currentUserRouter } from './routes/currentUser';
import { signIn } from './routes/signin';
import { signOut } from './routes/signout';
import { signUp } from './routes/signup';

const app = express();
app.set('trust proxy', true); // because traffic is coming from NGINX(a proxy)
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signIn);
app.use(signOut);
app.use(signUp);
app.use(errorHandler);

app.all('*', async () => {
  throw new NotFoundError('Route Not Found');
});

export { app };
