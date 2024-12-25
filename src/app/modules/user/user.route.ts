import { Router } from "express";
import { signInController, signupController } from "./user.controller";
 


export const userRoute = Router()

userRoute.post('/sign-up', signupController)
userRoute.post('/sign-in', signInController)
 

 



