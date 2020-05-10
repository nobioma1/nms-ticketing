import express from 'express';
import 'express-async-errors';

import { currentUserRouter } from './routes/currentUser';
import { signIn } from './routes/signin';
import { signOut } from './routes/signout';
import { signUp } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signIn);
app.use(signOut);
app.use(signUp);
app.use(errorHandler);

app.all('*', async () => {
  throw new NotFoundError();
});

app.listen(5000, () => {
  console.log('Auth service listening on PORT: 5000');
});
