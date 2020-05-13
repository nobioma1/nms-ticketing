import request from 'supertest';

import { app } from '../../app';
import { Ticket, TicketDoc } from '../../models/tickets';

const createTicket = async (): Promise<TicketDoc> => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  return ticket;
};

describe('[GET /api/orders] Get all user Orders', () => {
  it('fetch orders for a particular user', async () => {
    const ticket1 = await createTicket();
    const ticket2 = await createTicket();
    const ticket3 = await createTicket();

    const user1 = global.signin();
    const user2 = global.signin();

    await request(app)
      .post('/api/orders')
      .set('Cookie', user1)
      .send({ ticketId: ticket1.id });

    const { body: order1 } = await request(app)
      .post('/api/orders')
      .set('Cookie', user2)
      .send({ ticketId: ticket2.id });

    const { body: order2 } = await request(app)
      .post('/api/orders')
      .set('Cookie', user2)
      .send({ ticketId: ticket3.id });

    const res = await request(app).get('/api/orders').set('Cookie', user2);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].id).toEqual(order1.id);
    expect(res.body[1].id).toEqual(order2.id);
  });
});
