const fs=require("fs");
const sendResponse=require("../helpers/sendResponse");
const sendErrorResponse=require("../helpers/sendErrorResponse");
const readFilePromise = require("../helpers/readingFile");
const AppError = require("../AppError");


const getUsers=(req,res)=>{
    readFilePromise("/Users/sanika.pareek/Desktop/Express-server-with-file-system/data/users.json")
        .then((users)=>{
            return JSON.parse(users);
        })
        .then((users)=>{
            return sendResponse(req,res,{statusCode:200,message:"Data Fetched",payload:data});
        })
        .catch((err)=>{
            sendErrorResponse(new AppError("Unable to read the file",500),req,res);
        })
}

const getUserById=(req,res)=>{
    readFilePromise("/Users/sanika.pareek/Desktop/Express-server-with-file-system/data/users.json")
        .then((users)=>{
            return JSON.parse(users);
        })
        .then((users)=>{
            const{params:{id}}=req;
            const user=users.find((user)=>user.id===id);
            if(!user){
                return sendErrorResponse(new AppError("User with this Id doesn't exist",404),req,res);
            }
            return sendResponse(req,res,{statusCode:200,message:"User found",payload:user});
        })
        .catch((err)=>{
            sendErrorResponse(new AppError("Unable to read the file",500),req,res);
        })
}

module.exports={getUsers}