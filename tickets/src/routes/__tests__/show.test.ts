import request from 'supertest';

import { app } from '../../app';
import { generateID } from '../../test/helpers/generate-id';

describe('[GET /api/tickets/:id] Show Ticket', () => {
  it('response of 404 id ticket id is not valid', async () => {
    const id = generateID();
    const res = await request(app).get(`/api/tickets/${id}`);

    expect(res.status).toBe(404);
  });

  it('returns the ticket if id is valid', async () => {
    const payload = { title: 'Parte after PArte', price: 200 };

    const ticket = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send(payload);

    const res = await request(app).get(`/api/tickets/${ticket.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toEqual(payload.title);
    expect(res.body.price).toEqual(payload.price);
  });
});
