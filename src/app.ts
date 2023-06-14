import express, { Request, Response, Application, NextFunction } from "express";
import http from "http";
import connectDB from "./framework/database/mongodb/connection/connection";
import serverConfig from "./framework/webServer/server";
import expressConfig from "./framework/webServer/express";
import router from './framework/webServer/routes';
//middleware
import AppError from "./utilities/appError";
import { HttpStatus } from "./types/httpstatuscodes";
// import path from 'path';


const app :Application = express();
const server  = http.createServer(app);

//mongo
connectDB();

//middleware
expressConfig(app);

router(app);

app.all("*",(req:Request,res:Response,next:NextFunction)=>{
    next(new AppError('Not Found',HttpStatus.UNAUTHORIZED))
});
serverConfig(server).startServer()