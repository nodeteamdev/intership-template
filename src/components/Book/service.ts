import BookModel from './model';

async function getAllBooksCountPerCountry() {
    return BookModel
        .aggregate([
            {
                $group: {
                    _id: '$code3',
                    value: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    code3: '$_id',
                    value: '$value',
                },
            },
        ])
        .exec();
}

async function getNewBooks(limit: number) {
    return BookModel
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();
}

export {
    getAllBooksCountPerCountry,
    getNewBooks,
};
