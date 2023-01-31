function sum(a, b) {
  return (typeof(a) == `number` && typeof(b) == `number`) ? a + b : `TypeError`;
}

module.exports = sum;
