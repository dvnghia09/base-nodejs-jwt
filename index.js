const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const routes = require('./routes');
const logger = require("morgan")
const bodyParser = require('body-parser')

dotenv.config();
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(logger("combined"));
// Route
app.use(routes)

// database
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log('Connect database successful')
    } catch (error) {
        console.log('Connect database fail')
    }
}
connect()


app.listen(8000, () => {
    console.log('Server is runnig port 3000')
})