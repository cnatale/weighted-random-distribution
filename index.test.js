const WeightedRandomDistribution = require('./index');
const inPlaceUnsorted = WeightedRandomDistribution.inPlaceUnsorted;
const _ = require('lodash');

describe('inPlaceUnsorted', () => {
  test('returns one of the keys from the weights Object passed as param', () => {
    expect(inPlaceUnsorted({ 'a': 7, 'b': 2, 'c': 1 })).toMatch(/^[a|b|c]$/)
  })

  test('returns a reasonable distribution based on weight', () => {
    const results = [];
    for(let i = 0; i < 1000; i++) {
      results[i] = inPlaceUnsorted({ 'a': 9, 'b': 1, 'c': 1 });
    }
    const summedResults = _.countBy(results);
    expect(summedResults.a).toBeGreaterThanOrEqual(500);
    expect(summedResults.b).toBeGreaterThanOrEqual(50);
    expect(summedResults.c).toBeGreaterThanOrEqual(50);
  })

  test('throws an error if param does not pass schema validation', () => {
    expect(() => {
      inPlaceUnsorted({});
    }).toThrow();

    expect(() => {
      inPlaceUnsorted();
    }).toThrow();

    expect(() => {
      inPlaceUnsorted('foo');
    }).toThrow();

    expect(() => {
      inPlaceUnsorted([]);
    }).toThrow();
  });
})
