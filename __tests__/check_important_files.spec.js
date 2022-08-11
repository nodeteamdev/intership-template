const path = require('path');
const fs = require('fs');

const IMPORTANT_FILES = [
  '.eslintrc.js',
  'package.json',
  '.editorconfig',
  'package-lock.json',
  '.gitignore',
]; 

const EXIST = (PATH) => {
  try {
    fs.accessSync(PATH);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

describe('Checking exists file', () => {
  const rootDir = path.resolve(path.join(__dirname, '../'));

  IMPORTANT_FILES.forEach((item) => {
    test(`${item}`, (done) => {
      expect.assertions(1);
      const result = EXIST(`${rootDir}/${item}`);
      expect(result).toBe(true);
      done();
    });
  });
});