const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    
    this.eol = os.EOL;

  }

  _transform(chunk, encoding, cb) {

    while (true) {
      let myPos = chunk.toString().indexOf(this.eol, 0);
      if (myPos < 0) break;
      this.push(chunk.toString().slice(0, myPos));
      chunk = Buffer.from(chunk.toString().slice(myPos + (this.eol).length));
    }
    
    if (chunk.toString().length > 0) {
      this.push(chunk.toString());
    }

    cb(null, null);

  }
  
  _flush(cb) { 
       cb();
    };

}

module.exports = LineSplitStream;
