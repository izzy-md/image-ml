import arrayShuffle from './arrayShuffle';

export default function(arr, size1, size2){
    if(arr.length < size1 + size2){
        throw Error('Total of the sizes cannot be larger than the array length');
    }

    let shuffled = arrayShuffle(arr);
    let randomised = [];

    randomised.push(shuffled.slice(0, size1));
    randomised.push(shuffled.slice(size1, size1 + size2));

    return randomised;
}