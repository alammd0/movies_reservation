import type { Request, Response } from "express";
import uploadImage from "../lib/imagekit";
import { prisma } from "../lib/prisma";

// 1. add movies 
export const addMovies = async (req : Request, res : Response) => {
    try {
        const { name, description, duration, releaseDate, showTimes } = req.body;

        if (!name || !description || !duration || !releaseDate || !showTimes) {
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }

        // TODO: ADD FILE UPLOAD some thin else here 
        // @ts-ignore
        const poster = req.file

        if(!poster){
            return res.status(400).json({
                message : "Server error, please try again later"
            })
        }

        const posterUrl = await uploadImage(poster)

        if(!posterUrl){
            return res.status(400).json({
                message : "Server error, please try again later"
            })
        }

        const newMovie = await prisma.movie.create({
            data : {
                name : name,
                description : description,
                duration : duration,
                releaseDate : releaseDate,
                showTimes : showTimes,
                posterUrl : posterUrl
            }
        });

        return res.status(201).json({
            message : "Movie created successfully",
            data : newMovie
        })

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

        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                message : "Please provide a valid id"
            })
        }

        // check if movie exists
        const movieExits = await prisma.movie.findFirst({
            where : {
                id : Number(id)
            }
        });

        if(!movieExits){
            return res.status(404).json({
                message : "Movie does not exist"
            })
        }

        // check if user is authorized to delete the movie
        if(req.user.role === "ADMIN"){
            await prisma.movie.delete({
                where : {
                    id : Number(id)
                }
            });
            return res.status(200).json({
                message : "Movie deleted successfully"
            })
        }
        else {
            return res.status(401).json({
                message : "You are not authorized to delete this movie"
            })
        }
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
        const movies = await prisma.movie.findMany();

        return res.status(200).json({
            message : "Movies retrieved successfully",
            data : movies
        })
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
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                message : "Please provide a valid id"
            })
        }

        const movie = await prisma.movie.findUnique({
            where : {
                id : Number(id)
            }
        });

        if(!movie){
            return res.status(404).json({
                message : "Movie does not exist"
            })
        }

        return res.status(200).json({
            message : "Movie retrieved successfully",
            data : movie
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Server error, please try again later"
        })
    }    
}