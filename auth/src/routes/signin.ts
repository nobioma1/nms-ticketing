import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  res.send('Now you see me');
});

export { router as signIn };
