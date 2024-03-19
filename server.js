const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/connectDB');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3500;

const app = express();

connectDB()

app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/auth', require('./routes/auth'));

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})