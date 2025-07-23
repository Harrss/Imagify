import { Usermodel } from "../Model/User.model.js";
import FormData from "form-data";
import axios from "axios";


export const generateimage=async(req,res)=>{
    try {
        const {userID}=req;
        const {prompt}=req.body;
        const user=await Usermodel.findById(userID)
        if(!user || !prompt)
        {
            return res.status(403).json({
                success:false,
                message:"Something is missing"
            })
        }
        if(user.creditbalance===0 || user.creditbalance<0 )
        {
            return res.status(400).json({
                success:false,
                message:"No Coins left"
            })

        }

    const formdata=new FormData
    formdata.append('prompt',prompt)

    const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formdata,
        { headers: {
    'x-api-key': process.env.CLIPDROP_API,
  },
  responseType:'arraybuffer'

        }
    )

    const base64Image=Buffer.from(data,'binary').toString('base64')
    const resultImage=`data:image/png;base64,${base64Image}`

    await Usermodel.findByIdAndUpdate(user._id,{creditbalance:user.creditbalance-1})

    return res.status(200).json({
        success:true,
        message:'image generated',
        creditbalance:user.creditbalance-1,
        resultImage
    })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
        
    }
}