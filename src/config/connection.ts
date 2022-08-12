import mongoose from 'mongoose';
import logger from '../helpers/logger';

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
};

if (process.env.MONGODB_URI === undefined) {
    logger('process.env.MONGODB_URI is not specified', 'mongooseConnection error', 'error');
    process.exit(1);
}

const mongooseConnection = mongoose.createConnection(
    process.env.MONGODB_URI,
    connectOptions,
);

mongooseConnection.on('error', (error: Error) => {
    logger(error.message, 'mongooseConnection error', 'error');
    process.exit(1);
});

export default mongooseConnection;
