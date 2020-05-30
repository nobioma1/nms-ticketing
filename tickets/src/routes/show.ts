import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError } from '@nms-ticketing/common';

import { Ticket } from '../models/tickets';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError('Ticket Not Found');
  }

  res.status(200).send(ticket);
});

export { router as showTicketRouter };
