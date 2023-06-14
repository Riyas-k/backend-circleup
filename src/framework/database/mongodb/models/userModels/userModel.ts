import mongoose,{Schema,model} from "mongoose";

const userSchema = new Schema (
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        UserName:{
            type:String,
            required:true,
            // unique:true
        },
        phone:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        dp:{
            type:String
        },
        bio:{
            type:String
        },
        gender:{
            type:String
        },
        city:{
            type:String
        },
        DOB:{
            type:String
        },
        isBlock:{
            type:Boolean,
            default:false
        },
        followers:[],
        following:[]

    },
    {
        timestamps:true
    }
)

const User = model('user',userSchema);
export default User