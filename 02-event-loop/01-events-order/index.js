const fs = require('fs');
// не понял (
const myFile = 'solution.txt';
const myFullPath = myFile;

function myFileDelCrt(myFullPath) {
    if (fs.existsSync(myFullPath)) {
        try {
            fs.unlinkSync(myFullPath);
            fs.writeFileSync(myFullPath, '','utf8');
          } catch (err) {
            console.log(err);
          }
    }
}

function myFileAddInto(myFullPath, myAddStr) {
  fs.appendFile(myFullPath, myAddStr,'utf8', err => {if (err) throw err;})
}

myFileDelCrt(myFullPath);

const intervalId = setInterval(() => {
  console.log('James');
  myFileAddInto(myFullPath, 'James\n');
}, 10);

setTimeout(() => {
  const promise = new Promise((resolve) => {
    console.log('Richard');
    myFileAddInto(myFullPath, 'Richard\n');
    resolve('Robert');
  });

  promise
      .then((value) => {
        console.log(value);
        myFileAddInto(myFullPath, value + '\n');

        setTimeout(() => {
          console.log('Michael');
          myFileAddInto(myFullPath, 'Michael');

          clearInterval(intervalId);
        }, 10);
      });

  console.log('John');
  myFileAddInto(myFullPath, 'John\n');
}, 10);
