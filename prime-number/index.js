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

/**
 *
 * @param {number} size
 */
function calcPrimeNumbers(size) {
    const arr = new Array(size).fill(0);

    return arr
        .map((_, index) => index)
        .filter((value) => isPrimeNumber(value))
        .reduce((previous, current) => previous + current);
}

console.log(calcPrimeNumbers(1000));
