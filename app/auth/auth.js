const jwt = require('jsonwebtoken');
var serverPortFilePath;
if(process.env.NODE_ENV=="production"){
  serverPortFilePath="prod.env";
}
else if (process.env.NODE_ENV=="local") {
  serverPortFilePath="local.env";
}
else {
  serverPortFilePath="local.env";
}
const serverPortFile = require("dotenv").config({path: "./app/environments/"+serverPortFilePath});


 function admin(req,res,next) {
    try{
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, serverPortFile.parsed.admin);
      req.token = decoded;
      next();
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

 };
 function compareHash (pass, userPass) {
   return new Promise((resolve, reject)=> {
     bcrypt.compare(pass, userPass, function(err, res) {

       if(!res) return reject(res);
       resolve(res);
     });
   })
 };
module.exports={admin,compareHash}
