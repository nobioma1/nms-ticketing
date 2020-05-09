import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.send('auth-service up');
});

app.listen(5000, () => {
  console.log('Auth service listening on PORT: 5000');
});
