const fs=require("fs")
const writeFile=(path,data)=>{
    fs.writeFileSync(path,JSON.stringify(data));
}

// const writeFilePromise=(path,data)=>{
//     console.log(data)
//     return new Promise((resolve,reject)=>{
//         fs.writeFile(path,JSON.stringify(data),(err=>{
//             if(err){
//                 console.log(err)
//                 reject(err);
//             }else{
//                 resolve(true);
//             }
            
//         }))
//     })
    
// }

module.exports=writeFile;