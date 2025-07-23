import { Usermodel } from "../Model/User.model.js";
import bcrypt from "bcrypt"
import { json } from "express";
import jwt from "jsonwebtoken"

export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password)
        {
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })

        }

        const hash_password=await bcrypt.hash(password,10);

       const user= await Usermodel.create({
            name,
            email,
            password:hash_password,
        })

         const token= jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})

        

        return res.status(200)
        .cookie("token",token,{
         httpOnly: true, 
         sameSite: "strict",
         maxAge: 24 * 60 * 60 * 1000
      })
        .json({
            success:true,
            message:"Account created successfully"
        })


    } catch (error) {
        return res.status(500).json({
  success: false,
  message: "Something went wrong",
  error: error.message,
});

    }
}


export const login=async(req,res)=>{
    try {
         const {email,password}=req.body;
         if(!email || !password)
         {
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
         }

         const user=await Usermodel.findOne({email});

         if(!user)
         {
            return res.status(404).json({
                success:false,
                message:"Account not exist"
            })
         }
         const ispasswordcorrect=await bcrypt.compare(password,user.password)

         if(!ispasswordcorrect)
         {
            return res.status(401).json({
                success:false,
                message:"Password Not match"
            })
         }
         const token= jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})

         return res.status(200).cookie("token",token,{
         httpOnly: true, 
         sameSite: "strict",
         maxAge: 24 * 60 * 60 * 1000
      })
         .json({
            success:true,
            message:`Welcome Back ${user.name}`
         })

        
    } catch (error) {
        return res.status(500).json({
  success: false,
  message: "Something went wrong",
  error: error.message,
});

        
    }
   


}


export const usercredit=async(req,res)=>{ 
    try {
        console.log(req.body);
        

         const {userID}=req;
console.log(userID);

    const user=await Usermodel.findById(userID);
         if(!user)
    {
        res.status(403).json(
            {
                success:false,
                messsage:"User Not Found"
            }
        )
    }

    return res.status(200).json({
        success:true,
        credit:user.creditbalance,
        message:"success",
        user:{name:user.name}

    })
        
    } catch (error) {

        return res.status(403).json({
            success:false,
            message:"Some error occured"
        })
        
    }
   



}