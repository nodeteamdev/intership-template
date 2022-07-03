const randomString = function randomString(stringLength) {
    let rndString = '';
    while (rndString.length < stringLength) {
        rndString += Math.random().toString(36).substring(2);
    }
    return rndString.substring(0, stringLength);
};

module.exports = {
    randomString,
};
