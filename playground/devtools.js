function number(obj) {
  if (obj === 2n ** 256n - 1n) {
    return 'MaxUint256';
  }
  if (obj === 2n ** (256n - 1n) - 1n) {
    return 'MaxInt256';
  }
  if (obj >= BigInt(1e10)) {
    // Assuming everything bigger than 1e10 is a wei
    return `wei ${parseFloat(`${obj}`) / 1e18}`;
  }
  return parseFloat(`${obj}`);
}

window.devtoolsFormatters = window.devtoolsFormatters ?? [];
window.devtoolsFormatters.push({
  header: function (obj) {
    if (obj instanceof BigInt) {
      return [
        'div',
        { style: 'color: #f66' },
        ['span', {}, 'BigInt('],
        ['span', { style: 'color: #3f3' }, number(obj)],
        ['span', {}, ')'],
      ];
    }
    return null;
  },
  hasBody: function () {
    return false;
  },
});
