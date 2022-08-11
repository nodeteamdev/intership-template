import fs from 'fs';
import path from 'path';
import { parse as csvParse } from 'fast-csv';
import { Db } from 'mongodb';

const pathToCsv = path.resolve(__dirname, './seeds/books.csv');

const readAllRows = (): Promise<any[]> => new Promise((resolve, reject) => {
    const rows:any[] = [];
    fs.createReadStream(pathToCsv)
        .pipe(csvParse({ headers: true }))
        .on('error', reject)
        .on('data', (row) => {
            rows.push({
                ...row,
                craetedAt: Date.now(),
                updatedAt: Date.now(),
            });
        })
        .on('end', () => {
            resolve(rows);
        });
});

const migration = {
    async up(db: Db) {
        // IDEA: mongoimport --type csv -d db_name -c collection_name --headerline --drop file.csv

        const rows = await readAllRows();
        await db.collection('books').insertMany(rows);
    },

    async down(db: Db) {
        // NOTE: in our example down == remove all
        await db.collection('books').deleteMany({});
    },
};

export = migration;
