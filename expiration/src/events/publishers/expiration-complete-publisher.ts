import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@nms-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
