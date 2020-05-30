import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { generateID } from './helpers/generate-id';

declare global {
  namespace NodeJS {
    interface Global {
      signin(userId?: string): string[];
    }
  }
}

let mongo: any;

jest.mock('../nats-wrapper');

beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = 'testJWT';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id: string = generateID()) => {
  // Build JwT payload {id, email}
  const payload = {
    id,
    email: 'test@test.com',
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object {token: JWT}
  const session = { token };

  // Turn the session object to JSON
  const sessionJSON = JSON.stringify(session);

  // Encode session to base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return encoded express:sess=encoded
  return [`express:sess=${base64}`];
};
