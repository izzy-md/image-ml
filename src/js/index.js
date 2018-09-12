import '../scss/index.scss';

import Dataset from './tf-blurriness/data';
import train from './tf-blurriness/core/train';
import isBlurry from './tf-blurriness/core';

import arrayChunk from './tf-blurriness/utils/arrayChunk';
import arrayShuffle from './tf-blurriness/utils/arrayShuffle';

import * as data from '../../dataset/set';

console.log('Running');
document.querySelector('.loading').classList.remove('loaded');

// Generate the dataset
const dataset = new Dataset(
    arrayChunk(arrayShuffle(Object.keys(data)), 64).map(item => data[item])
);

dataset.data.then(async images => {
    document.querySelector('.loading').classList.add('loaded');

    // Train the model
    await train(images);

    // Predict
    // let test = await isBlurry('/Undistorted_%C3%91%E2%80%A0%C2%B0%C3%8A%C2%A7%C3%B2_004.._blur.9ca59335.jpg');

    // console.log(test);
});