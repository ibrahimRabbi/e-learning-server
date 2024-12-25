import envData from "../../config/config";
import { Tuser } from "./user.interface";
import jwt from 'jsonwebtoken';
import { userModel } from "./user.model";



export const signupService = async (payload: Tuser) => {

     const checkUserExistancy = await userModel.findOne({ email: { $eq: payload.email } })

     if (checkUserExistancy) {
          throw new Error('this user already exist please use unique email')
     }

     const insertUser = await userModel.create(payload)

     if (insertUser) {
          const credentials = {email: payload.email, password: payload.password}
          const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '7d' });
          return accessToken
     }

}





export const signInService = async (payload: Tuser) => {
     const checkExistancy = await userModel.findOne({ email: payload.email })


     if (!checkExistancy) {
          throw new Error('user is not exist')
     }

     if (checkExistancy.password !== payload.password) {
          throw new Error('invalid password')
     }



     const credentials = {
          email: checkExistancy.email,
          password: checkExistancy.password
     }
     const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '7d' })
     return accessToken
}

