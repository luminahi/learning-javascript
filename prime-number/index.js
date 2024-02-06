/**
 *
 * @param {number} size
 * @returns {number[]}
 */
function generateNumberArray(size) {
    let arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = i;
    }
    return arr;
}

/**
 * verify if is a prime number
 * @param {number} value
 * @returns {boolean}
 */
function isPrimeNumber(value) {
    if (value < 2) return false;
    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return true;
}

const result = generateNumberArray(1000)
    .filter((value) => isPrimeNumber(value))
    .reduce((previous, current) => previous + current);

console.log(result);
