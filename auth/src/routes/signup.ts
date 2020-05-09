import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  res.send('Now you see me');
});

export { router as signUp };
