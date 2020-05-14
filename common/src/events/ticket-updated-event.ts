import { Subjects } from './subjects';

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    orderId?: string;
    price: number;
    title: string;
    userId: string;
    version: number;
  };
}
