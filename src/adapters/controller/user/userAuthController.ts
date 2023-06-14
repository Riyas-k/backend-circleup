import { Request,Response } from "express";
import asyncHandler from 'express-async-handler';
import { AuthServices } from "../../../framework/services/user/userAuthServiceImp";
import { AuthServiceInterface } from "../../../application/services/user/userAuthServiceInt";
import { userRepositoryMongoDB } from "../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp";
import { UserDbInterface } from "../../../application/repositories/user/userRepositoryInf";
import { userLogin, userRegister } from "../../../application/useCase/user/auth/userAuth";

const authController = (authServiceInterface:AuthServiceInterface,
    authService:AuthServices,
    UserDbInterface:UserDbInterface,
    userDbService:userRepositoryMongoDB
    )=>{
     const dbUserRepository = UserDbInterface(userDbService());
     const authServices = authServiceInterface(authService())
    const registerUser = asyncHandler(async(req:Request,res:Response)=>{
       const {firstName,lastName,UserName,phone,email,password} = req.body;
       const user = {
        firstName,lastName,UserName,phone,email,password
       }
       const token = await userRegister(user,dbUserRepository,authServices)
       console.log(token);
       if(token.status==true){
           res.json({status:true,message:'User registered',token})
       }else{
        res.json({status:false})
       }
    })
    const loginUser = asyncHandler(async(req:Request,res:Response)=>{
      const {email,password} = req.body;
      const userDetails = {email,password}
      const user = await userLogin(userDetails,dbUserRepository,authServices)
      if(user.status){
        const {userExist} = user 
          res.json({status:true,userExist:userExist})
      }else{
        res.json({status:false})
      }
       
    })

    return {
        registerUser,loginUser
    }
}

export default authController