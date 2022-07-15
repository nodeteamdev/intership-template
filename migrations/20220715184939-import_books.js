const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const BookModel = require('../src/components/Book/model');

const pathToCsv = path.resolve(__dirname, './seeds/books.csv');

const readAllRows = () => new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(pathToCsv)
        .pipe(csv.parse({ headers: true }))
        .on('error', reject)
        .on('data', (row) => {
            rows.push(row);
        })
        .on('end', () => {
            resolve(rows);
        });
});

module.exports = {
    async up() {
        // IDEA: mongoimport --type csv -d db_name -c collection_name --headerline --drop file.csv

        const rows = await readAllRows();
        await BookModel.insertMany(rows);
    },

    async down(db) {
        // NOTE: in our example down == remove all
        await db.collection('books').deleteMany({});
    },
};
