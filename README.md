

![Node.js CI](https://github.com/cnatale/weighted-random-distribution/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/cnatale/weighted-random-distribution/branch/master/graph/badge.svg)](https://codecov.io/gh/cnatale/weighted-random-distribution)
# Weighted Random Distribution
A simple utility module to select from a set of discrete values based on weighted random distribution.

#### Table of Contents
1. [inPlaceUnsorted()](#inPlaceUnsorted)
2. [normalize()](#normalize)

### inPlaceUnsorted()

Perform an in-place unsorted weighted value selection. (The algorithm is ported from Python code [here](https://www.electricmonk.nl/log/2009/12/23/weighted-random-distribution/)).

##### Parameters

* **weights {object}** - An Object with each key representing one of the discrete values that will be selected, and each value representing a weight.

##### Returns
One of the keys from the weights param, with the probability of a key being returned based on the weight values {string}

##### Example
```javascript
inPlaceUnsorted({ 'a': 7, 'b': 2, 'c': 1 })
// output: 70% chance of 'a', 20% chance of 'b', 10 percent chance of 'c'

inPlaceUnsorted({ 'a': .1, 'b': .05, 'c': .05 })
// output: 50% change of 'a', 25% chance of 'b', 25% chance 'c'
```

Numeric values don't need to sum to any particular number, and can be decimal.

### normalize()

A utility method to provide [min-max normalization](https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization)) for input weights. Given a starting range of xMin and xMax, returns valueToNormalize mapped to the same relative position in relation to transformedMin and transformedMax. Defaults to a transformed range between 0 and 1.

##### Parameters

 * **valueToNormalize {number}**
 * **xMin {number}** The floor of the normalization range.
 * **xMax {number}** The ceiling of the normalization range.
 * **transformedMin {number}** Default value is 0.
 * **transformedMax {number}** Default value is 1.

##### Returns
The normalized representation of valueToNormalize {number}.

##### Examples
```javascript
normalize(50, 0, 100);
// output: .5

normalize(50, 0, 100, 0, 8);
// output: 4

normalize(20, 10, 20);
// output: 1

normalize(10, 10, 20, 30, 40);
// output: 30

normalize(20, 10, 20, 30, 40);
// output: 40
```
