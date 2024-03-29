import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config()
import cookieParser from 'cookie-parser';

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('database connected successfully');
}).catch((err)=>{
    console.log(err)
})

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/user',userRoutes )
app.use('/api/auth',authRoutes )

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'internal server error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})