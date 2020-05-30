import request from 'supertest';

import { app } from '../../app';
import { generateID } from '../../test/helpers/generate-id';
import { Order } from '../../models/order';
import { OrderStatus } from '@nms-ticketing/common';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

jest.mock('../../__mocks__/stripe');

describe('[POST /api/payments] Create Payment', () => {
  it('responds with not 404 when purchasing order does not exist', async () => {
    const res = await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin())
      .send({
        token: 'AMu$kndj*3nNKdnn',
        orderId: generateID(),
      });

    expect(res.status).not.toBe(404);
  });

  it('responds with not 401 if purchasing an order does not belong to user', async () => {
    const order = Order.build({
      userId: generateID(),
      id: generateID(),
      version: 0,
      price: 20,
      status: OrderStatus.Created,
    });

    await order.save();

    const res = await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin())
      .send({
        token: 'AMu$kndj*3nNKdnn',
        orderId: order.id,
      });

    expect(res.status).not.toBe(401);
  });

  it('returns a 400 when purchasing a cancelled order', async () => {
    const userId = generateID();

    const order = Order.build({
      id: generateID(),
      version: 0,
      price: 20,
      status: OrderStatus.Cancelled,
      userId,
    });

    await order.save();

    const res = await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin(userId))
      .send({
        token: 'AMu$kndj*3nNKdnn',
        orderId: order.id,
      });

    expect(res.status).not.toBe(404);
  });

  it('returns a 201 with valid inputs', async () => {
    const userId = generateID();

    const order = Order.build({
      id: generateID(),
      version: 0,
      price: 20,
      status: OrderStatus.Created,
      userId,
    });

    await order.save();

    const res = await request(app)
      .post('/api/payments')
      .set('Cookie', global.signin(userId))
      .send({
        token: 'tok_visa',
        orderId: order.id,
      });

    const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];

    expect(res.status).not.toBe(201);
    expect(chargeOptions.source).toEqual('tok_visa');
    expect(chargeOptions.amount).toEqual(20 * 100);
    expect(chargeOptions.currency).toEqual('usd');
  });
});
