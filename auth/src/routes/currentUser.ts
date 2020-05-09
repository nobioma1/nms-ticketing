import express from 'express';

const router = express.Router();

router.get('/api/users/current-user', (req, res) => {
  res.send('Now you see me');
});

export { router as currentUserRouter };
