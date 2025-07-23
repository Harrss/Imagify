import express from "express"
import { userauth } from "../Middlewares/auth.middleware.js";
import { generateimage } from "../Controllers/generateimage.controller.js";

const imgrouter=express.Router();

imgrouter.route('/generate-image').post(userauth,generateimage)


export default imgrouter