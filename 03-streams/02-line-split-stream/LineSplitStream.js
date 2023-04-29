const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    
    this.eol = os.EOL;
    this.tail = '';
  }

  _transform(chunk, encoding, cb) {
    let anlzStr = this.tail + chunk.toString();
    
    while (true) {
      let myPos = anlzStr.toString().indexOf(this.eol, 0);
      
      if (myPos < 0) break;
      
      this.push(anlzStr.toString().slice(0, myPos));
      anlzStr = anlzStr.toString().slice(myPos + (this.eol).length);
    }

    this.tail = anlzStr;
    
    cb();

  }
  
  _flush(cb) { 
    if (this.tail) {
      this.push(this.tail);
    }
    cb();
    };

}

module.exports = LineSplitStream;
