import request from 'supertest';

import { app } from '../../app';
import { generateID } from '../../test/helpers/generate-id';

describe('[PUT /api/tickets/:id] Update Ticket', () => {
  it('response of 404 if ticket id is not valid', async () => {
    const id = generateID();
    const res = await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signin())
      .send({ title: 'some title', price: 20 });

    expect(res.status).toBe(404);
  });

  it('responds with 401 if user is not authenticated', async () => {
    const res = await request(app).put('/api/tickets').send({});

    expect(res.status).not.toBe(401);
  });

  it('responds with 401 if user is not author of ticket', async () => {
    const user = global.signin();

    const ticket = await request(app)
      .post('/api/tickets')
      .set('Cookie', user)
      .send({ title: 'my ticket to test', price: 20 });

    const res = await request(app)
      .put(`/api/tickets/${ticket.body.id}`)
      .set('Cookie', global.signin())
      .send({ title: 'some title', price: 20 });

    expect(res.status).toBe(401);
  });

  it('validate ticket title and price fields', async () => {
    const user = global.signin();

    const ticket = await request(app)
      .post('/api/tickets')
      .set('Cookie', user)
      .send({ title: 'my ticket to test', price: 20 });

    await request(app)
      .put(`/api/tickets/${ticket.body.id}`)
      .set('Cookie', user)
      .send({ title: '', price: 20 })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${ticket.body.id}`)
      .set('Cookie', user)
      .send({ title: 'some title', price: -20 })
      .expect(400);
  });

  it('updates tickets if valid', async () => {
    const user = global.signin();
    const payload = { title: 'A different title', price: 200 };

    const ticket = await request(app)
      .post('/api/tickets')
      .set('Cookie', user)
      .send({ title: 'my ticket to test', price: 20 });

    await request(app)
      .put(`/api/tickets/${ticket.body.id}`)
      .set('Cookie', user)
      .send(payload);

    const res = await request(app).get(`/api/tickets/${ticket.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toEqual(payload.title);
    expect(res.body.price).toEqual(payload.price);
  });
});
