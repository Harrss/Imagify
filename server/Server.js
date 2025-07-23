import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import data from './Database/db.js';
import router from './Routes/User.routes.js';
import cookieParser from 'cookie-parser';
import imgrouter from './Routes/Image.routes.js';

data();

const PORT = process.env.PORT || 5000; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));
app.use(cookieParser())
app.use('/api/imagify/user', router);
app.use('/api/imagify/image', imgrouter);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});



