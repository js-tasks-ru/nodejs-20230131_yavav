const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    
    this.lines = [];
    this.myDelimit = '\r\n';
  }

  _transform(chunk, encoding, cb) {

    while (true) {
      let myPos = chunk.toString().indexOf(this.myDelimit, 0);

      if (myPos < 0) break;

      this.lines.push(chunk.toString().slice(0, myPos).trim());
      chunk = Buffer.from(chunk.toString().slice(myPos + (this.myDelimit == '\r\n' ? 2: 1)));
      
    }
    
    if (chunk.toString().length >= 0) this.lines.push(chunk.toString().trim());
    
    cb();
  }

  _flush(cb) { 
      this.lines.forEach((elm) => {
        this.push(elm + this.myDelimit);
      //cb(this.lines);
      //cb();
       });
       cb();
    };

}

module.exports = LineSplitStream;
