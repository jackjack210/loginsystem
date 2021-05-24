const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

dotenv.config({path: './config.env'});
require('./DB/conn');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log('server running on port ' + PORT );
}) 