import { Subjects } from './subjects';

export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    price: number;
    title: string;
    userId: string;
    version: number;
  };
}
