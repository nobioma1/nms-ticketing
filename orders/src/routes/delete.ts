import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@nms-ticketing/common';

import { Order } from '../models/order';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;

    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }

    if (String(order.userId) !== userId) {
      throw new NotAuthorizedError();
    }

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();

    res.status(200).send(order);
  }
);

export { router as deleteOrderRouter };
