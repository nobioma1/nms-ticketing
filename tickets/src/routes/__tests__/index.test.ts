import request from 'supertest';

import { app } from '../../app';

const createTicket = (): Promise<any> => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'Parte after PArte', price: 200 });
};

describe('[GET /api/tickets] All Tickets', () => {
  it('should fetch all available tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const res = await request(app).get(`/api/tickets`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
});
