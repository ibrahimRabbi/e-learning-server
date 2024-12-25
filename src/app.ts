import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import envData from './app/config/config';
import { userRoute } from './app/modules/user/user.route';
import { globalErrorHandle } from './app/middleWare/globalError';



 

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


//routes
app.use('/api/auth', userRoute)

//error
app.use(globalErrorHandle)





async function main() {
    await mongoose.connect(envData.databaseUrl as string);

    app.listen(envData.port, () => {
        console.log(`server is running on ${envData.port}`)
    })

}

main()