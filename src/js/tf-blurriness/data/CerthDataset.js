// This uses the CERTH Image Blur Dataset from https://mklab.iti.gr/results/certh-image-blur-dataset/
import * as data from '../../../../dataset/set';

export const dataset = Object.keys(data).map(item => data[item]);