import arrayRandomiser from '../utils/arrayRandomiser';

import config from '../config';
import model from './model';

const trainData = async data => {
    // The entire dataset doesn't fit into memory so we call train repeatedly
    // with batches using the fit() method.
    await model.fit(data.imageData, data.blurred, {
        epochs: 1
    });

    // tf.nextFrame() returns a promise that resolves at the next call to
    // requestAnimationFrame(). By awaiting this promise we keep our model
    // training from blocking the main UI thread and freezing the browser.
    return await tf.nextFrame();
};

const validateData = async data => {
    // The entire dataset doesn't fit into memory so we test the model repeatedly
    // with batches using the evaluate() method.
    await model.evaluate(data.imageData, data.blurred, {
        epochs: 1
    });

    // tf.nextFrame() returns a promise that resolves at the next call to
    // requestAnimationFrame(). By awaiting this promise we keep our model
    // training from blocking the main UI thread and freezing the browser.
    return await tf.nextFrame();
}

export default async function(data) {
    // Divide dataset randomly to training and test chunks
    const [
        chunkedTrainingData,
        chunkedValidatingData
    ] = arrayRandomiser(data, config.trainingSize, config.validatingSize);

    // Train the model
    console.log('Currently training the model, please wait');
    await Promise.all(chunkedTrainingData.map(await trainData));
    console.log('Finished training the model');

    // Test the model
    console.log('Currently testing the model, please wait');
    // await Promise.all(chunkedValidatingData.map(validateData));
    console.log('Finished testing the model');
}
