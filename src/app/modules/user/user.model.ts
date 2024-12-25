import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";



const userSchema = new Schema<Tuser>({
    
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, minlength: 8, required:true, default: 'rumble@@33' },

},
    { timestamps: true }
);

export const userModel = model<Tuser>('users', userSchema)






