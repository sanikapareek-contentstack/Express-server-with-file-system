const express=require("express");
const userRouter=require("./routes/users.route")
const app=express();

app.use(express.json());

app.use("/users",userRouter)

app.listen(3000,(req,res)=>{
    console.log("Server listening at 3000.");
})