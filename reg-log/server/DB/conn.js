const mongoose = require("mongoose");

const DB = process.env.DATABSE;

mongoose.connect(DB, {useUnifiedTopology: true, useNewUrlParser: true}). then( () => console.log("connection successfull"))
.catch((err) => console.log(err));