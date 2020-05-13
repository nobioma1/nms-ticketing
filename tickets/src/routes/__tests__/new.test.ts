import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/tickets';
import { natsWrapper } from '../../nats-wrapper';

describe('[POST /api/tickets] Create Tickets', () => {
  it('respond to route for post request', async () => {
    const res = await request(app).post('/api/tickets').send({});

    expect(res.status).not.toBe(404);
  });

  it('user must be authenticated', async () => {
    const res = await request(app).post('/api/tickets').send({});

    expect(res.status).toBe(401);
  });

  it('responds with not 401 if user is signed in', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({});

    expect(res.status).not.toBe(401);
  });

  it('validate ticket title', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: '', price: 20 })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ price: 20 })
      .expect(400);
  });

  it('validate ticket price', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'Parte after PArte' })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'Parte after PArte', price: -10 })
      .expect(400);
  });

  it('receives valid tickets body', async () => {
    const payload = { title: 'Parte after PArte', price: 200 };
    let tickets = await Ticket.find();

    expect(tickets).toHaveLength(0);

    const res = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send(payload);

    expect(res.status).toBe(201);

    tickets = await Ticket.find();

    expect(tickets).toHaveLength(1);
  });

  it('publishes an event', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'Test Event', price: 2000 });

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
