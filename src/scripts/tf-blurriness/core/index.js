import model from './model';
import Dataset from '../data';

export default async function(image){
    const { imageData } = await Dataset.loadImage(image);

    return model.predict(imageData).toBool().data;
}