import express from 'express';
import { currentUser } from '@nms-ticketing/common';

const router = express.Router();

router.get('/api/users/current-user', currentUser, (req, res) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
