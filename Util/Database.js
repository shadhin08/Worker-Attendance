const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnect = (linten) => 
{
    
    // mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@motul.8onemqp.mongodb.net/?retryWrites=true&w=majority`)
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@motul.kmuvvkb.mongodb.net/motul-db?retryWrites=true&w=majority`)
        .then(linten)
        .catch(err => 
        {
            console.log(err);
        });
};

exports.mongoConnect = mongoConnect;

