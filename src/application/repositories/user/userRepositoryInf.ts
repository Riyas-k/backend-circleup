import { userRepositoryMongoDB } from "../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp";

export const userDbRepository = (repository:ReturnType<userRepositoryMongoDB>) =>{
    const addUser = async(user:{
        firstName?:string,
        lastName?:string,
        UserName?:string,
        phone?:number,
        email?:string,
        password?:string
    })=>{
        return await repository.addUser(user)
    };
    const getUserByEmail = async(email:string)=>{
        return repository.getUserByEmail(email)
    }
    const getUserValid = async(email:string)=>{
        return repository.getUserValid(email)
    }
    return {
        addUser,getUserByEmail,getUserValid
    }
}
export type UserDbInterface = typeof userDbRepository;