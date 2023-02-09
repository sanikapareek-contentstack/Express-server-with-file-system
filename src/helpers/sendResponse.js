const sendResponse=(req,res,configObject)=>{

    const {statusCode,message,payload}=configObject;
    
    if(!payload){
        res.status(statusCode || 200).json({
            message:message
        });
    }else{
        res.status(statusCode || 200).json({
            message:message,
            data: payload
        });
    }
    

};

module.exports=sendResponse;