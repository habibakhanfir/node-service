'use strict';

module.exports = {
    db: {
        uri: process.env.MONGODB_URL || 'mongodb://11.10.0.3:27017/test',
        user: "root",
        pass: "root",
        dbName: "admin"
    },
};