import mongoose from 'mongoose';

const MONGODB_URI: string = 'mongodb://localhost:27017/';
const MONGODB_DB_MAIN: string = 'users_db';
const MONGO_URI: string = `${MONGODB_URI}${MONGODB_DB_MAIN}`;

const connectOptions: object = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default mongoose.createConnection(MONGO_URI, connectOptions);
