import '../scss/index.scss';

import Dataset from './tf-blurriness/data';
import train from './tf-blurriness/core/train';
import isBlurry from './tf-blurriness/core';

import * as data from '../../dataset/set';

// Generate the dataset
const dataset = new Dataset(
    Object.keys(data).map(item => data[item])
);

dataset.data.then(async data => {
    // Train the model
    await train(data);

    // Predict
    await isBlurry('/Undistorted_%C3%91%E2%80%A0%C2%B0%C3%8A%C2%A7%C3%B2_004.._blur.9ca59335.jpg');
});

console.log('Machine learning is fun!');