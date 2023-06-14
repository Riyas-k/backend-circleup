import express from 'express';
import adminAuthController from '../../../../adapters/controller/admin/adminAuthController';
import { AdminAuthServiceInterface } from '../../../../application/services/admin/adminAuthServiceInt';
import { adminAuthServices } from '../../../services/admin/adminAuthServiceImp';
import { adminDbRepository } from '../../../../application/repositories/admin/adminRepositoryInf';
import { adminRepositoryMongodb } from '../../../database/mongodb/repositories/admin/adminAuthRepository';


const adminAuthRouter = ()=>{
    const router = express.Router();
    const adminControllers = adminAuthController(AdminAuthServiceInterface,adminAuthServices,adminDbRepository,adminRepositoryMongodb);
    
    router.post('/login',adminControllers.loginAdmin)

    return router
}
export default adminAuthRouter;