const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require("mongoose");

app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error: ", err));

app.listen(8080,()=>{
    console.log("Server Started");
})

app.use("/",(req,res)=>{
    res.send("Hello AMbu!");
})