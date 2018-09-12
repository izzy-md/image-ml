export default function(arr, chunkSize){
    return new Array(chunkSize).fill().map((_, i) => arr[i]);
}