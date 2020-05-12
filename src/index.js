import * as tf from "@tensorflow/tfjs";
import { PINNBaseCore } from "./PINNBaseCore";
import PINNSHM from "./testSHM";

const omega = 2 * Math.PI;

const t = tf.reshape(tf.linspace(0, 1, 128), [128, 1]);
const u = tf.sin(t.mul(omega));

const tTrain = tf.reshape(tf.tensor1d([0.5, 0.1]), [2, 1]);
const uTrain = tf.sin(tTrain.mul(omega));

const lowerBounds = tf.tensor1d([0]);
const upperBounds = tf.tensor1d([1]);

// const model = new PINNBaseCore(
//   [1, 8, 8, 8, 8, 1],
//   lowerBounds,
//   upperBounds,
//   omega
// );

const model = new PINNSHM([1, 8, 8, 8, 8, 1], lowerBounds, upperBounds, omega);

model.trainAdam(tTrain, t, uTrain, 1000);

const u_hat = model.predict(t);

const mse = tf.losses.meanSquaredError(u_hat, u);
mse.print();
