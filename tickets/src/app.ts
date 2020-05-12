import express from 'express';
import 'express-async-errors';
import { errorHandler, NotFoundError } from '@nms-ticketing/common';

const app = express();
app.set('trust proxy', true); // because traffic is coming from NGINX(a proxy)
app.use(express.json());

app.all('*', async () => {
  throw new NotFoundError();
});

export { app };
