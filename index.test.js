const WeightedRandomDistribution = require('./index');
const inPlaceUnsorted = WeightedRandomDistribution.inPlaceUnsorted;
const normalize = WeightedRandomDistribution.normalize;
const quantileNormalize = WeightedRandomDistribution.quantileNormalize;
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

describe('normalize', () => {
  test('normalizes value', () => {
    expect(normalize(50, 0, 100)).toEqual(.5);
    expect(normalize(10, 5, 15)).toEqual(.5);
    expect(normalize(10, 10, 20)).toEqual(0);
    expect(normalize(20, 10, 20)).toEqual(1);
  })

  test('normalize within a transformed range', () => {
    expect(normalize(50, 0, 100, 0, 8)).toEqual(4);
    expect(normalize(50, 0, 100, 10, 20)).toEqual(15);
    expect(normalize(10, 10, 20, 30, 40)).toEqual(30);
    expect(normalize(20, 10, 20, 30, 40)).toEqual(40);
  })
});

describe('quantileNormalize', () => {
  test('returns normalized value for an index in an ordered array', () => {
    expect(quantileNormalize(1, 3)).toEqual(.5);
    expect(quantileNormalize(0, 3)).toEqual(0);
    expect(quantileNormalize(2, 3)).toEqual(1);

    expect(quantileNormalize(0, 11)).toEqual(0);
    expect(quantileNormalize(5, 11)).toEqual(0.5);
    expect(quantileNormalize(2, 11)).toEqual(.2);
    expect(quantileNormalize(7, 11)).toEqual(.7);
    expect(quantileNormalize(9, 11)).toEqual(.9);
  })
});