const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');

const connectDB = () => {
  /**
   * @function
   * @description
   * @returns mongoose.connection
   */

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(MONGO_URI, options);
  return mongoose.connection;
};

module.exports = connectDB;
