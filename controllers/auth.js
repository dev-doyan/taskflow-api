import bcrypt from "bcryptjs";
import {pool} from "../config/db.js" 
import {generate_token} from "../config/token.js" 

export const signup= async(req,res)=>{
    try {
        const {name,email,password}=req.body;

    const check_email=await pool.query(` select name from user where email=?`,[email]);
    if(check_email[0].length>0){
         return res.json({message:"user already exist"})
    }

    let hashedpass= await bcrypt.hash(password,5);

    let new_user= await pool.query(`insert into user(name,email,password)
        values(?,?,?)`,[name,email,hashedpass]);

        let token=generate_token(new_user[0].insertId);

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:2*24*60*60*1000, 
            secure :false
        })

        let displayuser=await pool.query(`select name,email,id from user where id=?`,[new_user[0].insertId])

res.json({message:"succesfully created user",
    user:displayuser
})
        


    } catch (error) {
        res.json({mesage:error.message})
    }
}


//login

try {
    export const login=async(req,res)=>{
    const {email,password}=req.body;

    let existinguser= pool.query(`select * from user where email=?`,[email]);
    console.log(existinguser);
    if(existinguser[0].length==0){
        return res.json({message:"user already exist"});

    }

    let currentuser=existinguser[0][0];

    let matchpass= await bcrypt.compare(password,currentuser.password);

    if(!matchpass){
       return res.json({message:"password wrong"});
    }

    let token=generate_token(currentuser.id);

    res.cookie("token",token,{
        httpOnly:true,
        maxage:1*24*60*60*1000
    })
    
res.json({message:"successfully logged in",user:{id:user.id,name:user.name}})
}

} catch (error) {
    res.json({message:error.message})
}