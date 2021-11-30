import { MongoClient } from 'mongodb';
const connectionString = 'mongodb://localhost:27017/?maxPoolSize=20&w=majority';
const client = new MongoClient(connectionString);

let dbConnection: any;

export const connectToServer = (callback: any) => {
    client.connect(function (err: any, db: any) {
        if (err || !db) {
            return callback(err);
        }

        dbConnection = db.db('exmongo');
        console.log('Successfully connected to MongoDB.');

        return callback();
    });
};

export const getDb = () => {
    return dbConnection;
};

// module.exports = {
//     connectToServer: function (callback: any) {
//         client.connect(function (err: any, db: any) {
//             if (err || !db) {
//                 return callback(err);
//             }

//             dbConnection = db.db('sample_airbnb');
//             console.log('Successfully connected to MongoDB.');

//             return callback();
//         });
//     },

//     getDb: function () {
//         return dbConnection;
//     },
// };
