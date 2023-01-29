function sum(a, b) {
  return c=(typeof(a)==`number` && typeof(b)==`number`)?a+b:`TypeError`;
}

module.exports = sum;
