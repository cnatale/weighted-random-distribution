
const reduce = require('lodash.reduce');
const findKey = require('lodash.findKey');

const Validator = require('jsonschema').Validator;
const validator = new Validator();
const weightsSchema = {
  type: 'object',
  patternProperties: {
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

  const weightsSum = reduce(weights, (result, value, key) => result += value, 0);
  
  const randomValueInWeightRange = Math.random() * (weightsSum - 1);
  let randomWeightCounter = 0;

  const selectedWeightedKey = findKey(weights, (weightValue, key) => {
    randomWeightCounter += weightValue;
    if (randomWeightCounter > randomValueInWeightRange) {
      return true;
    }

    return false;
  })

  return selectedWeightedKey;
}