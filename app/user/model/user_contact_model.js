const mongoose = require("mongoose")
const user_model = mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  message:{type:String,required:true},
  deleted:{type:Boolean,default:false}

},
{ timestamps:
  {
    createdAt: "createdAt",
    updatedAt:"updatedAt"
  }
}
)

module.exports = mongoose.model("user",user_model)
