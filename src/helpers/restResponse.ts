const ResourceNotFoundError = require('../error/ResourceNotFoundError');

function checkResourceIsFound(resource) {
    if (resource === null) {
        throw new ResourceNotFoundError();
    }
}

module.exports = {
    checkResourceIsFound,
};
