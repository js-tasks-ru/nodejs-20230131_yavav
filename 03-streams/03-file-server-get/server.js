const url = require('url');
const http = require('http');
const path = require('path');

const fs = require('fs');  

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);

  const myStream = fs.createReadStream(filepath);

  switch (req.method) {
    case 'GET':
      myStream.pipe(res);
      // myStream.on('data', (chunk) => {
      //   res.write(chunk);
      // });
      // myStream.on('end', () => {
      //   res.end();
      // });

      myStream.on('error', (err) => {
        if (err.code === 'ENOENT') {
          res.statusCode = 404;
          res.end('File not found');
        } else if (path.relative(filepath, path.join(__dirname, 'files')) != '') {
          res.statusCode = 400;
          res.end('Path is wrong');
        }
      });

      break;

    default:
      res.statusCode = 500;
      res.end('Not implemented');
  }
  
  req.on('aborted', () => {
    res.destroy();
  });

});

module.exports = server;
