const express = require('express');
const app = express(); //Initiate Express app
const router = express.Router();
const config = require ('./config/database'); //mongogoose config
const path = require ('path'); //nodeJs package for file paths
const authentication = require ('./routes/authentication')(router);
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); //node tool for MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=>{
    if(err){
       console.log('could not connect with database: ',err);
       
    }else{
        console.log('Connected to database: ' + config.db);
    }
});
//provide static directory for frontend
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/client'));
app.use('/authentication', authentication);
//connect server to Angular 2 index.hml
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
  });
  //start server on port 8080
  app.listen(8080, ()=>{
      console.log('Listening on port 8080');
  });