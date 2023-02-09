const express=require("express");
const { 
    getUsers, 
    getUserById, 
    validateUser,
    createUser
} = require("../controllers/users.controller");
const router=express.Router();

router.route("").get(getUsers).post(validateUser,createUser);
router.route("/:id").get(getUserById);

module.exports=router;