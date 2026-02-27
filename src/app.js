const express=require("express")
const cookieParser = require("cookie-parser")
const app =express()


app.use(express.json())

app.use(cookieParser())
/*  
*- Routes requires
 */
const authRouter= require("./routes/auth.routes")
const accountRoutes= require("./routes/account.routes")
/*   
*-user routes
*/
app.use("/api/auth",authRouter)
app.use("/api/account",accountRoutes)
module.exports = app