const fs=require("fs")
const writeFile=(path,data)=>{
    fs.writeFileSync(path,JSON.stringify(data));
}

module.exports=writeFile;