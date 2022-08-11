import mongoose from 'mongoose';
import ResourceNotFoundError from '../error/ResourceNotFoundError';

function checkResourceIsFound(resource: mongoose.Document | null) {
    if (resource === null) {
        throw new ResourceNotFoundError();
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    checkResourceIsFound,
};
