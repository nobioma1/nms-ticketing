import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/tickets';
import { OrderStatus } from '../../models/order';

describe('[DELETE /api/orders/:orderId] Cancel an Order', () => {
  it('marks order as cancelled order', async () => {
    const ticket = Ticket.build({
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
});