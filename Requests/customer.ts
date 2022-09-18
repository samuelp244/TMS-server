import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose';
import tickets from '../models/tickets.model'

export const getUserTickets = async(req:Request,res:Response)=>{
    try{
        const userTickets = await tickets.find({username:req.query.username})
        res.json({tickets:userTickets})
    }catch(err){
        res.json({status:'error', error:err})
        console.log(err)
    }
}