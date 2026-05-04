import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generate_token=(id)=>{
    const  token =jwt.sign(
        {id:id},
        process.env.JWT_SECRET,
        {expiresIn:"2d"}
    )
}