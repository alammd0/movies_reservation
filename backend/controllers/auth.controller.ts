import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req : Request, res : Response) => {
    try{
        const {name, email, password, role} = req.body

        // console.log(name, email, password, role)

        if(!name || !email || !password ){
            return res.status(400).json({
                message : "Please fill all the fields"
            })
        }

        // check if user already exists
        const user = await prisma.user.findUnique({
            where  : {
                email : email
            }
        });

        if(user){
            return res.status(400).json({
                message : "User already exists"
            })
        }

        const salt = 10 // salt rounds
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data : {
                name : name,
                email : email,
                password : hashedPassword,
                role : role
            }
        });

        return res.status(201).json({
            message : "User created successfully",
            data : newUser
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Server error, please try again letter"
        })
    }
}

export const login = async (req : Request, res : Response) => {
    try {
        const { email, password } = req.body;

        console.log(email, password);

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }

        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        });

        console.log(user)

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        console.log(isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password",
            });
        };

        const payload = {
            id : user.id,
            name : user.name,
            role : user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn : "1h"
        });

        console.log(token);

        return res.status(200).json({
            message : "Login successfully",
            data : {
                token : token,
                user : {
                    name : user.name,
                    role : user.role,
                    email : user.email
                }
            }
        })

    }
    catch(err){
        return res.status(500).json({
            message : "Server error, Please try after sometime"
        })
    }
}