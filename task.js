function inverse(arr, n) {
    if (n >= 0) {
        const firstPart = arr.slice(0, n);
        const rest = arr.slice(n).reverse();
        return firstPart.concat(rest);
    } else {
        const count = Math.abs(n);
        const rest = arr.slice(0, arr.length - count).reverse();
        const lastPart = arr.slice(arr.length - count);
        return rest.concat(lastPart);
    }
}

console.log(inverse([1,2,3,4,5]));
console.log(inverse([1,2,3,4,5], 2));
console.log(inverse([1,2,3,4,5], -2));
