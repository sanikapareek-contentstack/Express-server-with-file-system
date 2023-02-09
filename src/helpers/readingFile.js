const fs=require("fs");

// const readFilePromise=(path)=>{

//     return new Promise((resolve,reject)=>{
//         console.log(path)
//         fs.readFile(path,"utf-8",(err,data)=>{
//             if(err){
//                 console.log(err)
//                 reject(err);
//             }else{
//                 console.log(data)
//                 resolve(data);
//             }
//         })
//     })
// }

const readFilePromise=(path)=>{
    return new Promise((resolve,reject)=>{
    fs.readFile(path,"utf-8",(err,data)=>{
        if(err){
            reject(err);
        }else{
            resolve(data);
        }
    })
});
}



module.exports=readFilePromise;