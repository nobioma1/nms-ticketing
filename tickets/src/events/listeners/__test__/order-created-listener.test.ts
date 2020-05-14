import { Message } from 'node-nats-streaming';
import { OrderCreatedEvent, OrderStatus } from '@nms-ticketing/common';

import { natsWrapper } from '../../../nats-wrapper';
import { generateID } from '../../../test/helpers/generate-id';
import { Ticket } from '../../../models/tickets';
import { OrderCreatedListener } from '../order-created-listener';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    title: 'parte ticket',
    price: 200.5,
    userId: generateID(),
  });
  await ticket.save();

  const data: OrderCreatedEvent['data'] = {
    expiresAt: new Date().toISOString(),
    id: generateID(),
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
    status: OrderStatus.Created,
    userId: generateID(),
    version: 0,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket };
};

describe('Order Created Listener', () => {
  it('sets the order id of the ticket order', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(String(updatedTicket!.orderId)).toEqual(data.id);
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });

  it('it publishes a ticket updated event', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
