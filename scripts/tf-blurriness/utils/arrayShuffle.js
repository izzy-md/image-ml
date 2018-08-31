//Fisher-Yates Shuffle
export default function(arr){
    let m = arr.length;
    
    while (m) {
        let i = Math.floor(Math.random() * m--);
        
        let t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    
    return arr;
}