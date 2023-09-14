require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { checkJwt } = require("./Middlewares/authMiddlewares");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/images', express.static('images'));
// Connect Database
const { mongoConnect } = require("./Util/Database");
mongoConnect(
    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    })
);

// Routes Middleware
const Routes = require('./Routes/route');
app.use('/', Routes);


app.get('/',checkJwt, (req, res) => {
    res.send('Hello From Node Mongo eCommerce Server');
});