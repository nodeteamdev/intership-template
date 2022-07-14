const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const collection = 'books';
const pathToMigrationFile = path.join(__dirname, '..', 'mocks', 'books.csv');

function parseCsvToArray(pathToFile) {
    const elements = [];

    return new Promise((resolve, reject) => {
        const inputStream = fs.createReadStream(pathToFile, 'utf8');
        inputStream
            .pipe(csv())
            .on('data', (data) => {
                try {
                    const createdAt = new Date();
                    const updatedAt = new Date();
                    elements.push({ ...data, createdAt, updatedAt });
                } catch (error) {
                    reject(error);
                }
            })
            .on('end', async () => {
                try {
                    resolve(elements);
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', (error) => reject(error));
    });
}

module.exports = {
    async up(db) {
        const books = await parseCsvToArray(pathToMigrationFile);
        for (const bookChunk of _.chunk(books, 100)) {
            
            await db.collection(collection).insertMany(bookChunk);
        }

        await Promise.all([
            db.collection(collection).createIndex({ code3: 1 }, { name: 'code3', background: true })]);
    },

    async down(db) {
        await db.collection(collection).drop();
    },
};
