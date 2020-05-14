import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/tickets';
import { OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';
import { generateID } from '../../test/helpers/generate-id';

describe('[DELETE /api/orders/:orderId] Cancel an Order', () => {
  it('marks order as cancelled order', async () => {
    const ticket = Ticket.build({
      id: generateID(),
      title: 'concert',
      price: 20,
    });
    await ticket.save();

    const user = global.signin();

    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id });

    const res = await request(app)
      .delete(`/api/orders/${order.id}`)
      .set('Cookie', user);

    expect(res.status).toBe(200);
    expect(res.body.status).toEqual(OrderStatus.Cancelled);
  });

  it('error if order is not for auth user', async () => {
    const ticket = Ticket.build({
      id: generateID(),
      title: 'concert',
      price: 20,
    });

    await ticket.save();

    const user1 = global.signin();
    const user2 = global.signin();

    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user1)
      .send({ ticketId: ticket.id });

    const res = await request(app)
      .delete(`/api/orders/${order.id}`)
      .set('Cookie', user2);

    expect(res.status).toBe(401);
  });

  it('emits an event when order is cancelled', async () => {
    const ticket = Ticket.build({
      id: generateID(),
      title: 'concert',
      price: 20,
    });
    await ticket.save();

    await request(app)
      .delete(`/api/orders/${ticket.id}`)
      .set('Cookie', global.signin());

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
