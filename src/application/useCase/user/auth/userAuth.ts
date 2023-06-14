import { HttpStatus } from "../../../../types/httpstatuscodes";
import AppError from "../../../../utilities/appError";
import { UserDbInterface } from "../../../repositories/user/userRepositoryInf";
import { AuthServiceInterface } from "../../../services/user/userAuthServiceInt";

export const userRegister = async (
  //business logic
  user: {
    firstName: string;
    lastName: string;
    UserName: string;
    phone: number;
    email: string;
    password: any;
  },
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  user.email = user.email.toLowerCase();
  const isEmailExist: any = await userRepository.getUserByEmail(user.email);
  if (isEmailExist) {
    return { status: false };
  }
  let encryptPassword = await authService.encryptPassword(user.password);
  user.password = encryptPassword;
  const { _id: userId } = await userRepository.addUser(user);
  const token = await authService.generateToken(userId.toString());
  return { status: true, token };
};

export const userLogin = async (
  user: { email: string; password: string },
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
    let userExist:any = await userRepository.getUserValid(user.email)
    if(!userExist){
        return {status:false};
    }
    let checkPassword = await authService.comparePassword(user.password,userExist.password)
    if(checkPassword){
        return {status:true,userExist}
    }else{
        return {status:false}
    }
};
