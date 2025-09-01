import mongoose from 'mongoose'
import {uniqueId} from "../utils/index.js";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    token:{
        type: String,
        default: () => uniqueId()
    },
    verified:{
        type: Boolean,
        default: false
    },
    admin:{
        type: Boolean,
        default: false
    }
})

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.checkPassword = async function(inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
}

const User = mongoose.model('User', UserSchema)

export default User