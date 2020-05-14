import request from 'supertest';

import { app } from '../../app';
import { generateID } from '../../test/helpers/generate-id';
import { Ticket } from '../../models/tickets';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

describe('[POST /api/orders] Create Orders', () => {
  it('returns an error if ticket does not exist', async () => {
    const ticketId = generateID();

    const res = await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId });

    expect(res.status).toBe(404);
  });

  it('returns an error if ticket is already reserved', async () => {
    const ticket = Ticket.build({
      id: generateID(),
      title: 'concert',
      price: 20,
    });

    await ticket.save();

    const order = Order.build({
      ticket,
      userId: generateID(),
      status: OrderStatus.Created,
      expiresAt: new Date(),
    });

    await order.save();

    const res = await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id });

    expect(res.status).toBe(400);
  });

  it('reserves a ticket', async () => {
    const ticket = Ticket.build({
      id: generateID(),
      title: 'concert',
      price: 20,
    });
    await ticket.save();

    const res = await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id });

    expect(res.status).toBe(201);
  });

  it('emits an event when order is created', async () => {
    const ticket = Ticket.build({
      id: generateID(),
      title: 'concert',
      price: 20,
    });
    await ticket.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id });

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
