const WeightedRandomDistribution = require('./index');
const inPlaceUnsorted = WeightedRandomDistribution.inPlaceUnsorted;
const _ = require('lodash');

describe('inPlaceUnsorted', () => {
  test('returns one of the keys from the weights Object passed as param', () => {
    expect(inPlaceUnsorted({ 'a': 7, 'b': 2, 'c': 1 })).toMatch(/^[a|b|c]$/)
  })

  test('returns a reasonable distribution based on weight', () => {
    let results = [];
    for(let i = 0; i < 1000; i++) {
      results[i] = inPlaceUnsorted({ 'a': 9, 'b': 1, 'c': 1 });
    }
    let summedResults = _.countBy(results);
    expect(summedResults.a).toBeGreaterThanOrEqual(500);
    expect(summedResults.b).toBeGreaterThanOrEqual(50);
    expect(summedResults.c).toBeGreaterThanOrEqual(50);

    results = [];
    for(let i = 0; i < 1000; i++) {
      results[i] = inPlaceUnsorted({ 'a': 1, 'b': 1, 'c': 9 });
    }
    summedResults = _.countBy(results);
    expect(summedResults.a).toBeGreaterThanOrEqual(50);
    expect(summedResults.b).toBeGreaterThanOrEqual(50);
    expect(summedResults.c).toBeGreaterThanOrEqual(500);

    results = [];
    for(let i = 0; i < 1000; i++) {
      results[i] = inPlaceUnsorted({ 'a': 1, 'b': 9, 'c': 1 });
    }
    summedResults = _.countBy(results);
    expect(summedResults.a).toBeGreaterThanOrEqual(50);
    expect(summedResults.b).toBeGreaterThanOrEqual(500);
    expect(summedResults.c).toBeGreaterThanOrEqual(50);
  });

  test('works with larger weights', () => {
    let results = [];
    for(let i = 0; i < 1000; i++) {
      results[i] = inPlaceUnsorted({ 'a': 1000, 'b': 999, 'c': 500 });
    }
    let summedResults = _.countBy(results);
    expect(summedResults.a).toBeGreaterThanOrEqual(300);
    expect(summedResults.b).toBeGreaterThanOrEqual(300);
    expect(summedResults.c).toBeGreaterThanOrEqual(100);    
  });

  test('works with weights between 0 and 1', () => {
    let results = [];
    for(let i = 0; i < 1000; i++) {
      results[i] = inPlaceUnsorted({ 'a': .1, 'b': .05, 'c': .05 });
    }
    let summedResults = _.countBy(results);
    expect(summedResults.a).toBeGreaterThanOrEqual(400);
    expect(summedResults.b).toBeGreaterThanOrEqual(200);
    expect(summedResults.c).toBeGreaterThanOrEqual(200);   
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
