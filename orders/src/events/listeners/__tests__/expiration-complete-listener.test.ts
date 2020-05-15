import { Message } from 'node-nats-streaming';
import { ExpirationCompleteEvent, OrderStatus } from '@nms-ticketing/common';

import { natsWrapper } from '../../../nats-wrapper';
import { generateID } from '../../../test/helpers/generate-id';
import { Ticket } from '../../../models/tickets';
import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { Order } from '../../../models/order';

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: generateID(),
    title: 'test event',
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    expiresAt: new Date(),
    status: OrderStatus.Created,
    ticket,
    userId: generateID(),
  });

  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order, ticket };
};

describe('Expiration Complete Listener', () => {
  it('emit an Order cancelled event', async () => {
    const { listener, data, msg, order } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse(
      (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );

    expect(eventData.id).toEqual(order.id);
  });

  it('updated the order status to cancelled', async () => {
    const { listener, data, msg, order } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
