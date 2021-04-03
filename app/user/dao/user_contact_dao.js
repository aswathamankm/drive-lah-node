const UserModel  = require("../model/user_contact_model.js");
const AdminModel  = require("../model/admin_model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
function gen_keys_pass(pass){
  return new Promise((resolve, reject)=> {
    const saltRounds =  5;
    bcrypt.hash(pass, saltRounds, function(err, hash) {
      if(err) return reject(err);
      resolve(hash);
    });
  });
};
function compareHash (pass, adminPass) {
  return new Promise((resolve, reject)=> {
    bcrypt.compare(pass, adminPass, function(err, res) {

      if(!res) return reject(res);
      resolve(res);
    });
  })
};
var privateKey = 'thisissecrect';
exports.admin_login_dao = ((req,res)=>{
  let username_request = {username:req.username};
  AdminModel.find(username_request,(err,data)=>{

    if(!err && data.length !=0){
      compareHash( req.password,data[0].password).then(hash=>{
        console.log("hash"+hash)
        if(hash){

          let token =   jwt.sign(
            {
              username: req.username,
              password: req.password
            },
            privateKey
            ,
            { algorithm: 'HS256' },
            { expiresIn: '24h'   }
          )
          res({
            status:true,
            message:"Login Successfully",
            token:token,
            user:data
          })
        }
        else{
          res({
            status:true,
            message:"Invalid Password",
            token:null,
            user:null
          })
        }

      }).catch(err=>{
        res({
          status:false,
          message:"Invalid Credentials",
          token:null
        })
      })
    }
    else{
      res({
        status:false,
        message:"Invalid UserName",
        token:null
      })
    }
  })
  .catch(err=>{
    res.send({
      status:false,
      message:"Invalid Credentials",
      token:null
    })
  })
});

exports.admin_create_dao = ((req,res)=>{

  gen_keys_pass(req.password)
  .then(result=>{
    req.password = result;
    AdminModel.create(req,(err,data)=>{
      if(!err){
        delete data.password;
        res({
          status:true,
          message:"Created Successfully",
        });
      }
      else {
        res({
          status:false,
          message:err.message,
          //error:err
        });
      }
    })
  })
  .catch(err=>{
    res(err)
  })
});


exports.create_user_contact_dao= ((req,res)=>{
  UserModel.create(req,(err,data)=>{
    if(!err){

      res({
        status:true,
        message:"User Contact Created Successfully",
        data:data
      });
    }
    else {
      res({
        status:false,
        message:err.message
      });
    }
  })
})
exports.get_user_contact_dao= ((req,res)=>{
  let sort = req.sort ? req.sort : "-createdAt";
  req.deleted = req.deleted ? req.deleted :false
  let option = {
    skip : parseInt(req.skip)? parseInt(req.skip):0,
    limit : parseInt(req.limit)? parseInt(req.limit):10,
    // aggregate:req.aggregate?req.aggregate:[],
    sort: sort
  }
  delete req.skip
  delete req.limit
  delete req.aggregate
  delete req.sort
  delete req.sort_key
  UserModel.find(req,(err,data)=>{
    if(!err){
    //  req.deleted = req.deleted ? req.deleted :false ;
      UserModel.count(req, function(err, count){

        res({
          status:true,
          message:"success",
          data:data,
          total:count
        });
      });
    }
    else {
      res({
        status:false,
        message:err.message,
        error:err
      });
    }
  })
  .skip(option.skip)
  .limit(option.limit)
  .sort(option.sort)


})
