function sum(a, b) {
  if (Number.isFinite(a) && Number.isFinite(b)) {
    return a + b;
  } else {
    throw new TypeError('my data type error!');
  }
}

module.exports = sum;
