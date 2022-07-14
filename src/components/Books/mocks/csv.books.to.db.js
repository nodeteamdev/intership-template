const mongoose = require('mongoose');
const csvToJSON = require('csvtojson');

async function getJsonArray() {
    const jsonArray = await csvToJSON().fromFile('src/components/books/mocks/books.csv');
    return jsonArray;
}

mongoose.connect('mongodb://localhost:27017/users');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {
    console.log('Connection Successful!');

    const BookSchema = new mongoose.Schema(
        {
            code3: String,
            title: String,
            description: String,
        },
        {
            timestamps: true,
            versionKey: false,
        }
    );

    const Book = mongoose.model('books', BookSchema);

    const books = await getJsonArray();
    books.forEach(book => {
        Book({ code3: book.code3, title: book.title, description: book.description }).save((err, curBook) => {
            if (err) return console.error(err);
            return curBook;
        });
    });

});
