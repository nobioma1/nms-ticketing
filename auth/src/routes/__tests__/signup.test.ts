import request from 'supertest';

import { app } from '../../app';

describe('[POST /api/users/signup] User Signup', () => {
  it('returns a 201 on successful signup', async () => {
    const res = await request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'somepassword',
    });

    expect(res.status).toBe(201);
  });

  it('returns a 400 with an invalid email', async () => {
    const res = await request(app).post('/api/users/signup').send({
      email: 'somebademail',
      password: 'somepassword',
    });

    expect(res.status).toBe(400);
  });

  it('returns a 400 with an invalid password', async () => {
    const res = await request(app).post('/api/users/signup').send({
      email: 'somebademail',
      password: 's',
    });

    expect(res.status).toBe(400);
  });

  it('returns a 400 with missing fields', async () => {
    const res = await request(app).post('/api/users/signup').send({});

    expect(res.status).toBe(400);
  });

  it('does not allow duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@email.com',
        password: 'somepassword',
      })
      .expect(201);

    const res = await request(app).post('/api/users/signup').send({
      email: 'test@email.com',
      password: 'somepassword',
    });

    expect(res.status).toBe(400);
  });

  it('sets cookie after successful signup', async () => {
    const res = await request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'somepassword',
    });

    expect(res.get('Set-Cookie')).toBeDefined();
  });
});
