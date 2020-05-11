import request from 'supertest';

import { app } from '../../app';

describe('[POST /api/users/signout] User SignOut', () => {
  it('clears the cookie aster signing out', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@email.com',
        password: 'somepassword',
      })
      .expect(201);

    const res = await request(app).get('/api/users/signout');

    expect(res.status).toBe(200);
    expect(res.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
  });
});
