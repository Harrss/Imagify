import jwt from "jsonwebtoken"

export const userauth=async(req,res,next)=>{
    console.log("working");
    
    try {
        const token =req.cookies.token;
        console.log(token);
        
        if(!token)
        {
            return res.status(500).json({
                success:false,
                message:"Login again"
            })
        }
        const verify= jwt.verify(token,process.env.SECRET_KEY)
        
        
        if(!verify)
        {
            return  res.status(500).json({
                success:false,
                message:"Some Error Occured"
            })
        }

     req.userID=verify.id
        next();
    } catch (error) {
       return res.status(403).json({
                    success:false,
                    message:"Some error occured"
                })
        
    }
}