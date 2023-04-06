const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    
    this.eol = os.EOL;
    this.lines = [];
  }

  _transform(chunk, encoding, cb) {

    // while (true) {
    //   let myPos = chunk.toString().indexOf(this.eol, 0);
    //   if (myPos < 0) break;
    //   this.lines.push(chunk.toString().slice(0, myPos));
    //   chunk = Buffer.from(chunk.toString().slice(myPos + (this.eol).length));
    // }

    this.lines = chunk.toString().split(this.eol);

    this.lines.forEach((elm) => {
      this.push(elm);
    });
    
    this.lines.length = 0;
    
    cb(null, null);

  }
  
  _flush(cb) { 

       cb(null, null);
    };

}

module.exports = LineSplitStream;
