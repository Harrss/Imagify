import express from "express"
import {register,login, usercredit} from  "../Controllers/User.controller.js"
import { userauth } from "../Middlewares/auth.middleware.js";

const router=express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/credit').post(userauth,usercredit);


export default router;