let user_contact_dao = require("../dao/user_contact_dao.js");
 module.exports.create_user_contact_contr = ((req,res)=>{
   let request = req.body;
   user_contact_dao.create_user_contact_dao(request,(result)=>{
     res.send(result);
   })

 })
module.exports.get_user_contact_contr = ((req,res)=>{
     let request = req.query;
  user_contact_dao.get_user_contact_dao(request,(result)=>{
    res.send(result);
  })
})

module.exports.adminlogin_contr = ((req,res)=>{
  let request = req.body;
  user_contact_dao.admin_login_dao(request,(result)=>{
      res.send(result);
  })
})
module.exports.admin_create_contr = ((req,res)=>{
  let request = req.body;
  user_contact_dao.admin_create_dao(request,(result)=>{
    res.send(result);
})
})
