const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.curSize = 0;
    // this.curSize = '';
    // this.encoding=options.encoding;
  }

  _transform(chunk, encoding, callback) {
    // if (Buffer.from(this.curSize + chunk).length > this.limit) {
    if (this.curSize + Buffer.from(chunk).length > this.limit) {
      throw new LimitExceededError;
      // console.log(new LimitExceededError);
    } else {
      callback(null, chunk);
      this.curSize += Buffer.from(chunk).length;
      // this.curSize += chunk;
    }
  }
}

module.exports = LimitSizeStream;
