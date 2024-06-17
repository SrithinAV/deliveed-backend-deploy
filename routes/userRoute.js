import express from "express";

import { loginUser, registerUser,getAddress, addAddress } from "../controllers/userController.js";
import { userVerify } from "../middleware/userVerify.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser);
userRouter.post("/addAddress",userVerify,addAddress);
userRouter.post("/address",userVerify,getAddress);

export default userRouter;