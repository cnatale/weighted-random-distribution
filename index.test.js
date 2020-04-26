const WeightedRandomDistribution = require('./index');
const inPlaceUnsorted = WeightedRandomDistribution.inPlaceUnsorted;

describe('inPlaceUnsorted', () => {
  test('returns one of the keys from the weights Object passed as param', () => {
    expect(inPlaceUnsorted({ 'a': 7, 'b': 2, 'c': 1 })).toMatch(/^[a|b|c]$/)
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
