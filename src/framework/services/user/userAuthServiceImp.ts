import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configKeys from "../../../config/config";

export const authServices = () => {
  const encryptPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt);
    return password;
  };
  const generateToken = async(userId:string)=>{
      if(configKeys.JWT_SECRET){
        const token = jwt.sign({userId},configKeys.JWT_SECRET,{expiresIn:'30d'})
        return token
      }else{
        throw new Error("JWT TOKEN is not defined")
      }
  }
  const comparePassword = async(password:string,bodyPassword:string)=>{
    const passwordMatch = await bcrypt.compare(password,bodyPassword)
    return passwordMatch
      
  }
  return {
    encryptPassword,generateToken,comparePassword
  }
};

export type AuthServices = typeof authServices;
export type AuthServicesReturn = ReturnType<AuthServices> 