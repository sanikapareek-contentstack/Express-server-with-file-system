const sendResponse=(req,res,configObject)=>{

    const {statusCode,message,payload}=configObject;

    res.status(statusCode || 200).json({
        message:message,
        data: payload
    });

};

module.exports=sendResponse;