import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/';
const MONGODB_DB_MAIN = 'users_db';
const MONGO_URI = `${MONGODB_URI}${MONGODB_DB_MAIN}`;

export default mongoose.createConnection(MONGO_URI);
