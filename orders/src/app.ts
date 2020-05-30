import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@nms-ticketing/common';

import { newOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes';
import { showOrderRouter } from './routes/show';
import { deleteOrderRouter } from './routes/delete';

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

app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.use(errorHandler);

app.all('*', async () => {
  throw new NotFoundError('Route Not Found');
});

export { app };
