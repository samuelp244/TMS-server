// @ts-nocheck
import { uploadFile,downloadFile } from "../aws/awsS3"
import express, { Express, Request, Response } from 'express'
import images from "../models/images.model"
import { getDateTime } from "../common/common_functions"
import fs from "fs"
import util from "util"

const unlinkFile = util.promisify(fs.unlink);

export const uploadHandler = async(req:Request,res:Response)=>{
    const file = req.file
    const currDateTime = getDateTime();
    try{
        const result = await uploadFile(file)
        await unlinkFile(file?.path)
        await images.create({
            username:req.body.username,
            imageKey:result.Key,
            imageName:currDateTime
        })
        res.json({message:"upload success"})
    }catch(e){
        console.log(e);
        res.json({message:"upload failed"})
    }
}

export const downloadHandler = async(req:Request,res:Response)=>{
    const key = req.params.key;
    try{
        const readStream = downloadFile(key);
        readStream.pipe(res)
    }catch(e){
        res.json({message:"invalid Key"})
    }
    
} 

export const listImagesHandler = async(req:Request,res:Response)=>{
    const user = req.params.user;
    try{
        const imageList = await images.find({username:user})
        res.json({"images":imageList})
    }catch(e){
        console.log(e)
        res.json({error:"404"})
    }
}