const mongoose = require("mongoose");
const brcypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required for creating user"],
    trim: true,
    lowercase: true, // fixed
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Name is required for creating account"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength:[6,"password should contain the charater"],
    select:false
  }
}, {
  timestamps: true
});
userSchema.pre("save",async function(next){
  if(!this.isModified(password)){
    return
  }
  const hash = await brcypt.hash(this.password,10)
  this.password = hash
   return next()
})
userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password. this.password)
}
module.exports = mongoose.model("User", userSchema);
