function sum(a, b) {
  try {
    if (typeof(a) == 'number' && typeof(b) == 'number') {
      return a + b;
    } else {
      throw new TypeError('data type error!');
    }
  } catch (err) {
    return err.name;
  }
}

module.exports = sum;
