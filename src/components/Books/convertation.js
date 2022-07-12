const CSVToJSON = require('csvtojson');

async function convertation() {
  const convertToJson = await CSVToJSON().fromFile('./src/components/Books/mocks/books.csv');

  return convertToJson;
}

module.exports = { convertation };
