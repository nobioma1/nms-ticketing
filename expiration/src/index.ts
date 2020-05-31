import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listeners';

const start = async () => {
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID not provided');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL not provided');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID not provided');
  }

  try {
    await natsWrapper.connect({
      clusterId: process.env.NATS_CLUSTER_ID,
      clientId: process.env.NATS_CLIENT_ID,
      url: process.env.NATS_URL,
    });

    natsWrapper.client.on('close', () => {
      console.log('NATS Connection closed');
      process.exit();
    });

    new OrderCreatedListener(natsWrapper.client).listen();

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  } catch (e) {
    console.log(e);
  }
};

start();
