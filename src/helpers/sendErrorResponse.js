const sendErrorResponse=(error,req,res)=>{
    res.status(error.statusCode || 500).json({
        message:error.message,
    });
};

module.exports=sendErrorResponse;
