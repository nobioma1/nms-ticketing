import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@nms-ticketing/common';

const app = express();
app.set('trust proxy', true); // because traffic is coming from NGINX(a proxy)
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(errorHandler);

app.all('*', async () => {
  throw new NotFoundError();
});

export { app };
