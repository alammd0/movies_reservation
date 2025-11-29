import type { Request, Response } from "express";

// 1. add movies 
export const addMovies = async (req : Request, res : Response) => {
    try {

    }
    catch(err){
        return res.status(500).json({
            message : "Server error, please try again later"
        })
    }
}

// 2. Update movies 
export const updateMovies = async (req : Request, res : Response) => {
    try {

    }
    catch(err){
        return res.status(500).json({
            message : "Server error, please try again later"
        })
    }
}

// 3. Delete movies
export const deleteMovies = async (req : Request, res : Response) => {
    try{

    }
    catch(err){
        return res.status(500).json({
            message : "Server error, please try again later"
        })
    }
}

// 4. Get Movies 
export const getMovies = async (req : Request, res : Response) => {
    try {

    }
    catch(err){
        return res.status(500).json({
            message : "Server error, please try again later"
        })
    }
}

// 5. Get Movies by Id
export const getMoviesById = async (req : Request, res : Response) => {
    try {

    }
    catch(err){
        return res.status(500).json({
            message : "Server error, please try again later"
        })
    }    
}