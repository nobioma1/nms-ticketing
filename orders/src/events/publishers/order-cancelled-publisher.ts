import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@nms-ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
