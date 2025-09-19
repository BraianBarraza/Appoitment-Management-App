import User from '../models/User.js';
import {sendEmailVerification} from "../emails/authEmailService.js";

const signUp = async (req, res) => {
    //no empty fields
    if (Object.values(req.body).includes('')) {
        const error = new Error('All fields are mandatory');
        return res.status(400).json({msg: error.message})
    }
    const {email, name, password} = req.body;
    //no duplicate users
    const userExists = await User.findOne({email})
    if (userExists) {
        const error = new Error('User already exists');
        return res.status(400).json({msg: error.message})
    }
    //validate password
    const MIN_PASSWORD_LENGTH = 8;
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
        return res.status(400).json({msg: error.message})
    }

    try {
        //Create a new Instance of User
        const user = new User(req.body);
        //save user in db
        const result = await user.save()

        const {name, email, token} = result;
        await sendEmailVerification({
            name,
            email,
            token
        })

        res.json({
            msg: "User saved successfully, please check your email to verify your account"
        })

    } catch (err) {
        console.error(err);
    }
}

const confirmAccount = async (req, res) => {
    const {token} = req.params
    const user = await User.findOne({token})
    if (!user) {
        const error = new Error('Invalid token');
        return res.status(401).json({msg: error.message})
    }

    try {
        user.verified = true;
        user.token = '';
        await user.save();
        res.json({msg: 'User verified successfully, you can now log in'})
    }catch (error){
        console.log(error)
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    //check if user exists
    const user = await User.findOne({email})
    if (!user) {
        const error = new Error('Incorrect User or Password');
        return res.status(401).json({msg: error.message})
    }
    //check if the user is verified
    if (!user.verified) {
        const error = new Error('Please verify your account');
        return res.status(401).json({msg: error.message})
    }
    //check user password
    if (await user.checkPassword(password)) {
        res.json({msg: 'User authenticated'})
    }else{
        const error = new Error('Incorrect User or Password');
        return res.status(401).json({msg: error.message})
    }
}

export {
    signUp,
    confirmAccount,
    login
};