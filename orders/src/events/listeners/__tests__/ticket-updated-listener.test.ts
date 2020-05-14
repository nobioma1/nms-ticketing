import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent } from '@nms-ticketing/common';

import { natsWrapper } from '../../../nats-wrapper';
import { generateID } from '../../../test/helpers/generate-id';
import { Ticket } from '../../../models/tickets';
import { TicketUpdatedListener } from '../ticket-updated-listener';

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: generateID(),
    title: 'test event',
    price: 20,
  });
  await ticket.save();

  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    price: 12,
    title: 'test event boogie',
    userId: generateID(),
    version: ticket.version + 1,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket };
};

describe('Ticket Updated Listener', () => {
  it('finds, updates and saves a ticket', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    const processedTicket = await Ticket.findById(ticket.id);

    expect(ticket).toBeDefined();
    expect(processedTicket!.title).toEqual(data.title);
    expect(processedTicket!.version).toEqual(data.version);
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });

  it('does not ack if event version is not in order', async () => {
    const { listener, data, msg } = await setup();

    data.version = 10;

    try {
      await listener.onMessage(data, msg);
    } catch (err) {}

    expect(msg.ack).not.toHaveBeenCalled();
  });
});
