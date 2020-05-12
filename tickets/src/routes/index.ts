import express, { Request, Response } from 'express';
import { NotFoundError } from '@nms-ticketing/common';

import { Ticket } from '../models/tickets';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find();

  res.status(200).send(tickets);
});

export { router as indexTicketRouter };
