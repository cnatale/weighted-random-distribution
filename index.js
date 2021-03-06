
const reduce = require('lodash.reduce');
const findKey = require('lodash.findkey');

const Validator = require('jsonschema').Validator;
const validator = new Validator();
const weightsSchema = {
  type: 'object',
  patternProperties: {
    /* eslint-disable-next-line */
    '[\s\S]*': {
      type: 'number'
    }
  },
  minProperties: 1
}

/**
 * Perform an in-place unsorted weighted value selection.
 * 
 * @param weights - an Object with each key representing one of the discrete values that will be selected,
 *   and each value representing a weight
 * 
 * @returns one of the keys from the weights param, with the probability of a key being returned based on
 *   the weight values
 */
exports.inPlaceUnsorted = function inPlaceUnsorted(weights) {
  if(!weights) { throw 'weighted-random-distribution.inPlaceUnsorted: function requires one parameter' }
  validator.validate(weights, weightsSchema, { throwError: true });

  const weightsSum = reduce(weights, (result, value) => result += value, 0);
  
  const randomValueInWeightRange = Math.random() * weightsSum;
  let randomWeightCounter = 0;

  const selectedWeightedKey = findKey(weights, (weightValue) => {
    randomWeightCounter += weightValue;
    if (randomWeightCounter > randomValueInWeightRange) {
      return true;
    }

    return false;
  })

  return selectedWeightedKey;
}

/**
 * Performs unity-based normalization. By default, valueToNormalize is normalized to a value between 0 and 1. 
 * 
 * @param valueToNormalize
 * @param xMin {number} The floor of the normalization range.
 * @param xMax {number} The ceiling of the normalization range.
 * @param transformedMin {number} Default value is 0.
 * @param transformedMax {number} Default value is 1.
 */
exports.normalize = function normalize(valueToNormalize, xMin, xMax, transformedMin = 0, transformedMax = 1) {
  return transformedMin + ((valueToNormalize - xMin) * (transformedMax - transformedMin)) / (xMax - xMin);
}

/**
 * @param index {number} of an array element
 * @param arrayLength {number} length of the array
 * @returns A number between 0 and 1, representing relative position of the element index in the ordered array.
*/
exports.quantileNormalize = function quantileNormalize(index, arrayLength) {
  return index / (arrayLength - 1);
}