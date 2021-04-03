const mongoose = require("mongoose")
const admin_model = mongoose.Schema({
  username:{type:String,required:true},
  password:{type:String,required:true},
  deleted:{type:Boolean,default:false}

},
{ timestamps:
  {
    createdAt: "createdAt",
    updatedAt:"updatedAt"
  }
}
)

module.exports = mongoose.model("admin",admin_model)
