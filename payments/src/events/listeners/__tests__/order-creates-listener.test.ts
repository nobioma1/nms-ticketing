import { Message } from 'node-nats-streaming';
import { OrderCreatedEvent, OrderStatus } from '@nms-ticketing/common';

import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { generateID } from '../../../test/helpers/generate-id';
import { Order } from '../../../models/order';

const setup = () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent['data'] = {
    id: generateID(),
    version: 0,
    expiresAt: '',
    userId: generateID(),
    status: OrderStatus.Created,
    ticket: {
      id: generateID(),
      price: 10,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

describe('Order Created Listener', () => {
  it('replicates the order info', async () => {
    const { listener, data, msg } = setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price);
  });

  it('acks the message', async () => {
    const { listener, data, msg } = setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
