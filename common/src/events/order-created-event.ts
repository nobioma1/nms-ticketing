import { Subjects } from './subjects';
import { OrderStatus } from '../types/order-status';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    expiresAt: string;
    id: string;
    ticket: {
      id: string;
      price: number;
    };
    status: OrderStatus;
    userId: string;
    version: number;
  };
}
