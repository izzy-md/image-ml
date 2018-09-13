import '../scss/index.scss';

import * as AI from './tf-blurriness/import';
import * as data from '../../dataset/set';

const { arrayChunk, arrayShuffle } = AI.utils;

console.log('Running');
document.querySelector('.loading').classList.remove('loaded');

// Generate the dataset
const dataset = new AI.GeneralDataset(
    arrayChunk(arrayShuffle(Object.keys(data)), AI.config.trainingSize * AI.config.validatingSize).map(item => data[item])
);

dataset.data.then(async images => {
    document.querySelector('.loading').classList.add('loaded');

    // Train the model
    await AI.Train(images);

    // Predict
    let test = await AI.IsBlurry('/Undistorted_%C3%91%E2%80%A0%C2%B0%C3%8A%C2%A7%C3%B2_004.._blur.9ca59335.jpg');

    console.log(test);
});