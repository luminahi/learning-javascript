/**
 *
 * @param {string} str1
 * @param {string} str2
 * @returns {boolean}
 */
function isEqual(str1, str2) {
    if (str1.length !== str2.length) return false;

    let counter = 0;

    for (let i = 0; i < str1.length; i++) {
        if (str1[i] != str2[i]) counter++;
    }

    if (counter > 0) {
        console.log(`there are ${counter} difference(s)!`);
        console.log(`${str1} is different from ${str2}`);
        return false;
    }

    return true;
}

/**
 * It compares two strings of equal size if they are similar based on a value.
 * @param {string} str1
 * @param {string} str2
 * @param {number} factor
 * A number between 0 and 1. It determines how precise should be the similarity, 0 for identical strings only. Defaults to 0.25.
 * @returns {boolean}
 */
function isSimilar(str1, str2, factor = 0.25) {
    if (str1.length !== str2.length) return false;

    let counter = 0;
    let length = str1.length;

    for (let i = 0; i < length; i++) {
        if (str1[i] != str2[i]) counter++;
    }

    const limit = Math.floor(length * factor);

    if (counter > limit) {
        console.log(`there are ${counter} difference(s)!`);
        console.log(`${str1} is not similar to ${str2}`);
        return false;
    }

    console.log(`there are ${counter} difference(s)`);
    console.log(`${str1} is similar to ${str2}`);
    return true;
}

isSimilar("alex ferreira", "alex ferreiey", 0.1);
isSimilar("sarah kasugano", "sara  soragano", 1);
isEqual("alex", "aloy");
isEqual("sora", "sora");
