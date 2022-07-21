const CSVToJSON = require('csvtojson');

class ConvertationAdapter {
  static async convertation() {
    const csvToJson = await CSVToJSON().fromFile('./books.csv');

    return csvToJson;
  }
}

const adapter = ConvertationAdapter.convertation();

module.exports = { adapter };
