# Weighted Random Distribution
A simple utility module to select from a set of discrete values based on weighted random distribution.

## Usage

```javascript
inPlaceUnsorted({ 'a': 7, 'b': 2, 'c': 1 })
// result: 70% chance of 'a', 20% chance of 'b', 10 percent chance of 'c'
```

Numeric values don't need to sum to any particular number, and can be decimal.