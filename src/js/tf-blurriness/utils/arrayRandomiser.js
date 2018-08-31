import arrayShuffle from './arrayShuffle';

export default function(arr, ...sizes){
    if(sizes.reduce((t, c) => t += c, 0) >= arr.length){
        throw Error('Total of the sizes cannot be larger than the array length');
    }
    
    let shuffled = arrayShuffle(arr);
    let randomised = [];
    let previous = 0;
    
    for(let size of sizes){
        if(sizes.hasOwnProperty(size)){
            randomised.push(shuffled.slice(previous, size));
            
            previous = size;
        }
    }
    
    return randomised;
}