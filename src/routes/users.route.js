const express=require("express");
const { 
    getUsers, 
    getUserById, 
    validateUser,
    createUser,
    deleteUser,
    validateUpdateData,
    updateUser
} = require("../controllers/users.controller");
const router=express.Router();

router.route("").get(getUsers).post(validateUser,createUser);
router.route("/:id").get(getUserById).delete(deleteUser).put(validateUpdateData,updateUser);

module.exports=router;