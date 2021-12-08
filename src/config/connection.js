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

  require('../components/User/model');
  require('../components/Auth/token-model');

  return mongoose.connection;
};

module.exports = connectDB;
