import User from "../../models/userModels/userModel";

export const userRepositoryMongoDB = ()=> {
    const addUser = async (user:{
        firstName?:string,
        lastName?:string,
        UserName?:string,
        phone?:number,
        email?:string,
        password?:string
    }) =>{
        const newUser = new User(user);
        return await newUser.save()
    }
    const getUserByEmail = async (email:string)=>{
        const user : any = await User.findOne({email:email});
        return user
    }
    const getUserValid = async(email:string)=>{
        const user:any = await User.findOne({email:email})
       
        return user
    }

    return {
        addUser,getUserByEmail,getUserValid
    }
}

export type userRepositoryMongoDB = typeof userRepositoryMongoDB;