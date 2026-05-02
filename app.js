import express from 'express'
import dotenv from 'dotenv'
import { check_connection } from './config/db.js';
const app=express()
dotenv.config();


//middlewears
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message:"working"})
})


app.listen(process.env.PORT,()=>{
    console.log(` port running at ${process.env.PORT}`);
    check_connection()
})