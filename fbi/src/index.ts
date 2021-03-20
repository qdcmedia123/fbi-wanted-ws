/**
 * Server code goes here...
 */
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import {UserCreatedListender} from './events/listeners/user-created-listener';


const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.info("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    // Listening events 
    // Listen to user created event 
    new UserCreatedListender(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);
  }
  app.listen(process.env.PORT || 3000, () => {
    console.info(`App running on port ${process.env.PORT || 3000}`);
  });
};

start();