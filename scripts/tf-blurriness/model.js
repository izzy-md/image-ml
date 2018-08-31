import config from "./config";

const model = tf.sequential();

// Layer 1
model.add(
    tf.layers.conv2d({
        inputShape: [config.image.width, config.image.height, 1],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: "relu",
        kernelInitializer: "varianceScaling"
    })
);

// Pooling 1
model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

// Layer 2
model.add(
    tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: "relu",
        kernelInitializer: "varianceScaling"
    })
);

// Pooling 2
model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

// Flatten
model.add(tf.layers.flatten());

// Outputs
model.add(
    tf.layers.dense({
        units: 2,
        kernelInitializer: "varianceScaling",
        activation: "softmax"
    })
);

// The optimiser
export const optimiser = tf.train.sgd(config.learning);

// Compile
model.compile({
    optimizer: optimiser,
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
});

export default model;
