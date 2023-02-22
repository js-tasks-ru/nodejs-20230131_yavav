const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.setEncoding(options.encoding);
    // this.curSize = 0;
    this.curSize = '';
  }

  _transform(chunk, encoding, callback) {
    // if (this.curSize + Buffer.from(chunk, encoding).length > this.limit) {
    if (Buffer.from(this.curSize + chunk).length > this.limit) {
      console.log(new LimitExceededError);
    } else {
      callback(null, chunk);
      // this.curSize += Buffer.from(chunk, encoding).length;
      this.curSize += chunk;
    }
  }
}

module.exports = LimitSizeStream;
