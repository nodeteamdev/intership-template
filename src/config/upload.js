const multer = reuire('multer');
const path = require('path');

const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes('csv')) {
        cb(null, true);
    } else {
        cb('Please upload only csv file.', false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../resources/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    },
});

const uploadFile = multer({ storage, fileFilter: csvFilter });

module.exports = uploadFile;