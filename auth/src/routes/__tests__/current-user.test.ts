import request from 'supertest';

import { app } from '../../app';

describe('[POST /api/users/current-user] Current User', () => {
  it('respond with the details of the current user', async () => {
    const cookie = await global.signin();

    const res = await request(app)
      .get('/api/users/current-user')
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
  });

  it('respond with null if not authenticated', async () => {
    const res = await request(app).get('/api/users/current-user').expect(200);

    expect(res.body.currentUser).toBeNull();
  });
});
