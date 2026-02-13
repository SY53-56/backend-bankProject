const mongoose =require("mongoose")

function conectToDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("server is connect to db")
    })
    .catch(err=>{
         console.log("error",err)
         process.exit(1)
    })
}
module.exports = conectToDB