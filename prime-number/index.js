/**
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

/**
 * return the sum of all prime numbers from 2 to size number
 * @param {number} size
 * @returns {number}
 */
function calcPrimeNumbers(size) {
    return Array(size)
        .fill(0)
        .map((_, index) => index)
        .filter((value) => isPrimeNumber(value))
        .reduce((previous, current) => previous + current);
}

console.log(calcPrimeNumbers(1000));
