//creating express server
const express=require('express');
//creating express-handelbars
const exphbs=require('express-handlebars');
//creating body parser
const bodyParser = require('body-parser');
//creating mysql
const mysql =require('mysql');





//dotenv
require('dotenv').config();


//initializing expree
const app=express();
//making port to listen
const port=process.env.PORT || 5000;





//Body-Parser(passing middleware)
app.use(bodyParser.urlencoded({extended:false}));
app.use (bodyParser.json());



//static file
app.use(express.static('public'));




//templating engine
app.engine('hbs',exphbs({extname:'.hbs',defaultLayout:false,layoutsDir:"views/layouts"}));
app.set('view engine','hbs');




//connecting to the database
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
   database: process.env.DB_NAME
  });
connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log('Connected as id ' + connection.threadId);
    }
});


const routes = require('./server/routes/users');
app.use('/', routes);











app.listen(port, ()=>console.log(`listen on port ${port}`));