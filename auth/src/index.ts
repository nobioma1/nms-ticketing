import express from 'express';

import { currentUserRouter } from './routes/currentUser';
import { signIn } from './routes/signin';
import { signOut } from './routes/signout';
import { signUp } from './routes/signup';

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signIn);
app.use(signOut);
app.use(signUp);

app.listen(5000, () => {
  console.log('Auth service listening on PORT: 5000');
});
