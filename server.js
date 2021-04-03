const express = require('express')
const app = express();
const cors = require('cors');
const colors = require('colors');
const bodyParser= require('body-parser');
const mongoose  = require('mongoose');

const secureroutes = express.Router();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(secureroutes);
let serverPortFilePath;
if(process.env.NODE_ENV=="production"){
  serverPortFilePath="prod.env";
}
else if(process.env.NODE_ENV=="local") {
  serverPortFilePath="local.env";
}
else if(process.env.NODE_ENV=="dev") {
  serverPortFilePath="dev.env";
}
else {
  serverPortFilePath="local.env";
}
const serverPortFile = require('dotenv')
.config({path: './app/environments/'+serverPortFilePath});
const env_port = process.env.PORT || serverPortFile.parsed.PORT || 8000;
const server = app.listen(env_port, function(err){
  const port = server.address().port;

  if(!err){
    console.log(`Example app listening at http://'+${serverPortFile.parsed.HOST}:${port}`)
      console.log(
        colors.bgBlue("Running application in "+serverPortFile.parsed.MODE+" mode"));
        const url = serverPortFile.parsed.URL

        mongoose.connect(url);

        const connection = mongoose.connection;

        connection.once("open", function(){
          console.log("MongoDB database connection established successfully");
          var routers = require('./router.js');
          routers(app);
        });
      }
      else {
        console.log(err)
      }
    })
