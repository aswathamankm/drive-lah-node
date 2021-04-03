const jwt = require('jsonwebtoken');
module.exports = function(app){
  const user_contact_contr = require("../user/controller/user_contact_controller.js");
  app.post("/admin/login",user_contact_contr.adminlogin_contr)
  app.post("/admin/create",user_contact_contr.admin_create_contr)

app.post("/user/contact/create",user_contact_contr.create_user_contact_contr);
app.get("/user/find",user_token,user_contact_contr.get_user_contact_contr);
function user_token(req,res,next) {
   try{
     const token = req.headers.authorization.split(" ")[1];
     var privateKey = 'thisissecrect';
     const decoded = jwt.verify(token, privateKey,{ algorithm: 'HS256'});
     req.token = decoded;
     next();
   }
   catch(error){
       return res.status(401).json({
           message: 'Auth failed'
       })
   }

};
}
