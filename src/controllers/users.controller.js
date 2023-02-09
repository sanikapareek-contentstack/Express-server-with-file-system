const sendResponse=require("../helpers/sendResponse");
const sendErrorResponse=require("../helpers/sendErrorResponse");
const readFilePromise = require("../helpers/readingFile");
const writeFilePromise=require("../helpers/writingFile");
const User=require("../model/User.Model")
const AppError = require("../AppError");
const writeFile = require("../helpers/writingFile");
const path="/Users/sanika.pareek/Desktop/Express-server-with-file-system/data/users.json"

const getUsers=(req,res)=>{
    readFilePromise(path)
        .then((users)=>{
            return JSON.parse(users);
        })
        .then((users)=>{
            return sendResponse(req,res,{statusCode:200,message:"Data Fetched",payload:users});
        })
        .catch((err)=>{
            sendErrorResponse(new AppError("Unable to read the file",500),req,res);
        })
}

const getUserById=(req,res)=>{
    readFilePromise(path)
        .then((users)=>{
            return JSON.parse(users);
        })
        .then((users)=>{
            const{params:{id}}=req;
            const user=users.find((user)=>user.id===id);
            if(!user){
                return sendErrorResponse(new AppError("User with this Id doesn't exist",404),req,res);
            }
            return sendResponse(req,res,{statusCode:200,message:"User Found",payload:user});
        })
        .catch((err)=>{
            console.log(err);
            sendErrorResponse(new AppError("Unable to read the file",500),req,res);
        })
}

const validateUser=(req,res,next)=>{
    const {body}=req;
    const validKeys=[
        "id",
        "name",
        "profileImage",
        "introduction",
        "profileLink"
    ]
    const result=validKeys.every((key)=>Object.keys(body).includes(key));
    if(!result){
        return sendErrorResponse(new AppError("Data Missing",422),req,res);
    }
    next();
}

const createUser=(req,res)=>{
    readFilePromise(path)
        .then((users)=>{
            return JSON.parse(users);
        })
        .then((users)=>{
            
            const { body }=req;
            const user=users.find((user)=>user.id===body.id);
            
            if(user){
                return sendErrorResponse(new AppError("User with this Id already exists",404),req,res);
            }
            
            const newUser=new User(body);
            users.push(newUser);

            try{
                writeFile(path,users);
                return sendResponse(req,res,{statusCode:200,message:"User added successfully",payload:newUser})
            }catch(err){
                return sendErrorResponse(new AppError("Unable to write the file",500),req,res);
            } 
        })
        .catch((err)=>{
            console.log(err);
            sendErrorResponse(new AppError("Unable to read the file",500),req,res);
        })
}

const deleteUser=(req,res)=>{
    const {params:{id}}=req;
    readFilePromise(path)
        .then((users)=>{
            return JSON.parse(users);
        })
        .then((users)=>{
            const {params:{id}}=req;
            const user=users.find((user)=>user.id===id);
            if(!user){
                return sendErrorResponse("User with this Id doesn't exist",404,req,res);
            }
            const index=users.findIndex(user=>user.id===id);
            users.splice(index,1);
            try{
                writeFile(path,users);
                return sendResponse(req,res,{statusCode:204,message:"User deleted sucessfully"})
            }catch(err){
                return sendErrorResponse(new AppError("Unable to write the file",500),req,res);
            }

        })
        .catch((err)=>{
            console.log(err);
            sendErrorResponse(new AppError("Unable to read the file",500),req,res);
        })
}

const validateUpdateData=(req,res,next)=>{
    const {body}=req;
    const validKeys=[
        "name",
        "profileImage",
        "introduction",
        "profileLink"
    ]

    const result=Object.keys(body).every((key)=>validKeys.includes(key));
    if(!result){
        return sendErrorResponse(new AppError("Data Missing",422),req,res);
    }
    next();
}

const updateUser=(req,res)=>{
    const {params:{id}}=req;
    const {body}=req;
    readFilePromise(path)
        .then((users)=>{
            return JSON.parse(users);
        })
        .then((users)=>{
            const {params:{id}}=req;
            const user=users.find((user)=>user.id===id);
            if(!user){
                return sendErrorResponse("User with this Id doesn't exist",404,req,res);
            }
            Object.keys(body).forEach((key)=>user[key]=body[key]);
            try{
                writeFile(path,users);
                return sendResponse(req,res,{statusCode:201,message:"User updated sucessfully",payload:user})
            }catch(err){
                return sendErrorResponse(new AppError("Unable to write the file",500),req,res);
            }

        })
        .catch((err)=>{
            console.log(err);
            sendErrorResponse(new AppError("Unable to read the file",500),req,res);
        })

}

module.exports={getUsers,getUserById,validateUser,createUser,deleteUser,validateUpdateData,updateUser}