import * as tf from "@tensorflow/tfjs";
import { PINNBaseCore } from "./PINNBaseCore";

const omega = 2 * Math.PI;

const t = tf.reshape(tf.linspace(0, 1, 128), [128, 1]);
const u = tf.sin(t.mul(omega));

const lowerBounds = tf.tensor1d([0]);
const upperBounds = tf.tensor1d([1]);

const model = new PINNBaseCore(
  [1, 8, 8, 8, 8, 1],
  lowerBounds,
  upperBounds,
  omega
);

model.trainAdam(t, t, u, 1000);

const u_hat = model.predict(t);

const mse = tf.losses.meanSquaredError(u_hat, u);
