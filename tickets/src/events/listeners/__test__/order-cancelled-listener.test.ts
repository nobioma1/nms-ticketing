import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent } from '@nms-ticketing/common';

import { natsWrapper } from '../../../nats-wrapper';
import { generateID } from '../../../test/helpers/generate-id';
import { Ticket } from '../../../models/tickets';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = generateID();

  const ticket = Ticket.build({
    title: 'parte ticket',
    price: 200.5,
    userId: generateID(),
  });

  ticket.set({ orderId });
  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    ticket: {
      id: ticket.id,
    },
    version: 0,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket, orderId };
};

describe('Order Cancelled Listener', () => {
  it('sets the order id of the ticket order to undefined', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).not.toBeDefined();
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
