import request from 'supertest';

import { app } from '../../app';

describe('[POST /api/users/signin] User Signin', () => {
  it('fails if email is not valid', async () => {
    const res = await request(app).post('/api/users/signin').send({
      email: 'test@test.com',
      password: 'somepassword',
    });

    expect(res.status).toBe(400);
  });

  it('fails if password is not valid', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'somepassword',
      })
      .expect(201);

    const res = await request(app).post('/api/users/signin').send({
      email: 'test@test.com',
      password: 'wrongpassword',
    });

    expect(res.status).toBe(400);
  });

  it('fails if respond with cookie is credentials is valid', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'somepassword',
      })
      .expect(201);

    const res = await request(app).post('/api/users/signin').send({
      email: 'test@test.com',
      password: 'somepassword',
    });

    expect(res.status).toBe(200);
    expect(res.get('Set-Cookie')).toBeDefined();
  });
});
