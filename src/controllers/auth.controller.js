const userModel =require("../models/user.model")
const jwt =require("jsonwebtoken")
const emailService =require("../services/email.service")

 async function userRegisterController(req,res){
    const {email,name ,password} = req.body

    const isExists =await userModel.findOne({email:email})
    if(isExists){
        return res.status(422).json({message:"user already exist eith email",status:"failed"})
    }
    const user = await userModel.create({
        email,name,password
    })
     const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)
    res.status(201).json({user:{_id:user._id , email:user.email,name:user.name},
        token
    })
 emailService.sendRegisterEmail(user.email, user.name).catch(err => console.log("Email failed", err));
}


async function userLoginController(req,res) {
      const {email ,password} = req.body
      const user = await userModel.findOne({email}).select("+password")
      if(!user) return res.status(404).json({message:"user not exists with this email"})
    const isMatch = user.comparePassword(password)
if(!isMatch){
  return res.status(422).json({message:"user already exist eith email",status:"failed"})
}
const token = jwt.sign({userId:user._id }, process.env.JWT_SECRET,{expiresIn:"3d"})
 res.cookie("token",token)
    res.status(200).json({user:{_id:user._id , email:user.email,name:user.name},
        token
    })
}


module.exports={
    userRegisterController,
    userLoginController
}
