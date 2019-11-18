const express= require('express');
const app= express();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParse= require('body-parser');
const cors=require('cors');
const users = require('./routes/users');
const posts = require('./routes/posts');
const paniers = require('./routes/paniers');
const commands = require('./routes/commands');

require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParse.json());
app.use('/users',users);
app.use('/posts',posts);
//app.use('/paniers',paniers);
app.use('/commands',commands);
//Routes
app.get('/',(req,res)=>{
    res.send('We are in home');
});


//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
()=>console.log('Connected to DB !!') 
);
app.use('/uploads',express.static('uploads'));



//How to we start listening to the server
app.listen(3000);
