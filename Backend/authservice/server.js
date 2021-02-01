const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const eurekaHelper = require('./eureka-helper');





//get access to process.env
require('dotenv').config({
    path: './config/config.env'
})


const app = express();
connectDB();

app.use(bodyParser.json());



app.use('/auth-api', authRouter);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

eurekaHelper.registerWithEureka('auth-service', PORT);
