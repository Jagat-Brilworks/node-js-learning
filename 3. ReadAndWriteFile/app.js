const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './Test.txt');

const readFile = (doWrite, message) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) console.log(err);
    else {
      console.log(message, data.toString());
      doWrite && writeFile();
    }
  });
};

const writeFile = () => {
  fs.writeFile(filePath, 'Hello ParTner!', (err) => {
    if (err) console.log(err);
    else {
      readFile(false, 'After appending');
    }
  });
};

const fileOperation = () => {
  readFile(true, 'Before appending');
};

fileOperation();
