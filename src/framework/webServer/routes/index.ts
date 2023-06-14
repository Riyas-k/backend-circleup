import { Application } from "express";
import authRouter from "./user/userRoutes";
import adminAuthRouter from "./admin/adminRoutes";


const routes = (app:Application)=>{

    app.use('/',authRouter())
    app.use('/admin',adminAuthRouter())
}

export default routes