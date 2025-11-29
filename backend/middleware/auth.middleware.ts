import type { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { prisma } from '../lib/prisma';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      userId?: number;
    }
  }
}


export const authUserMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    
    const token = req.headers.authorization; 

    if(!token){
        return res.status(401).json({
            message : "Please login first"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId : string };

        // check if user exists
        const user = await prisma.user.findFirst({
            where : {
                id : Number(decoded.userId)
            }
        });

        if(!user){
            return res.status(401).json({
                message : "User does not exist"
            })
        }

        // console.log(user);
        req.user = user;
        req.userId = user.id;

        next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message : "Internal server error"
        });
    }
}

export const userRoleMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    try{
        if(req.user.role === "ADMIN"){
            return res.status(401).json({
                message : "You are not authorized to access this route"
            })
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message : "Internal server error"
        });
    }
}

export const adminRoleMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    try{
        if(req.user.role === "USER"){
            return res.status(401).json({
                message : "You are not authorized to access this route"
            })
        }
        next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message : "Internal server error"
        });
    }
}