const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split("")[1]
   console.log(token)
   if(!token) return res.status(401).json({message: "unauthorized access , token is missing"})
    
  try{
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      const user=  await userModel.findById(decode.userId)
     req.user= user
     return next()
  }catch(e){
  return  res.status(401).json({message:e})
  }
}
module.exports= authMiddleware