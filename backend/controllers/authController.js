import User from '../models/User.js';
import {sendEmailPasswordReset, sendEmailVerification} from "../emails/authEmailService.js";
import {generateJWT} from "../utils/index.js";
import {uniqueId} from "../utils/index.js";

const DEMO_USER = {
    name: 'Demo User',
    email: 'mail@mail.com',
    password: '1234456789',
};

const signUp = async (req, res) => {
    const {email, name, password} = req.body;

    //no empty fields
    if (!email || !name || !password) {
        const error = new Error('All fields are mandatory');
        return res.status(400).json({msg: error.message})
    }

    try {
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

        //Create a new Instance of User with only allowed fields
        const user = new User({name, email, password});
        //save user in db
        const result = await user.save()

        const {name: userName, email: userEmail, token} = result;
        await sendEmailVerification({
            name: userName,
            email: userEmail,
            token
        })

        res.json({
            msg: "User saved successfully, please check your email to verify your account"
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while processing your request'})
    }
}

const ensureDemoUser = async (req, res) => {
    try {
        let demoUser = await User.findOne({email: DEMO_USER.email});

        if (!demoUser) {
            demoUser = new User({
                name: DEMO_USER.name,
                email: DEMO_USER.email,
                password: DEMO_USER.password,
                verified: true,
                token: '',
            });

            await demoUser.save();
        } else {
            let shouldSave = false;

            if (!demoUser.verified || demoUser.token) {
                demoUser.verified = true;
                demoUser.token = '';
                shouldSave = true;
            }

            if (!(await demoUser.checkPassword(DEMO_USER.password))) {
                demoUser.password = DEMO_USER.password;
                shouldSave = true;
            }

            if (shouldSave) {
                await demoUser.save();
            }
        }

        res.json({
            msg: 'Demo user is ready',
            email: DEMO_USER.email,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while preparing the demo user'})
    }
}

const confirmAccount = async (req, res) => {
    const {token} = req.params

    try {
        const user = await User.findOne({token})
        if (!user) {
            const error = new Error('Invalid token');
            return res.status(401).json({msg: error.message})
        }

        user.verified = true;
        user.token = '';
        await user.save();
        res.json({msg: 'User verified successfully, you can now log in'})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: 'An error occurred while confirming your account'})
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
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
            const token = generateJWT(user._id)
            res.json({token})
        } else {
            const error = new Error('Incorrect User or Password');
            return res.status(401).json({msg: error.message})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while logging in'})
    }
}

const forgotPassword = async (req, res) => {
    const {email} = req.body;

    try {
        //check if user exists
        const user = await User.findOne({email})
        if (!user) {
            const error = new Error('User does not exist');
            return res.status(404).json({msg: error.message})
        }

        user.token = uniqueId()
        const result = await user.save();

        await sendEmailPasswordReset({
            name: result.name,
            email: result.email,
            token: result.token
        })

        res.json({msg: 'We have sent you an email with instructions to reset your password'})
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while processing your request'})
    }
}

const verifyPasswordResetToken = async (req, res) => {
    const {token} = req.params

    try {
        const isValidToken = await User.findOne({token})
        if (!isValidToken) {
            const error = new Error('Invalid token');
            return res.status(401).json({msg: error.message})
        }
        res.json({msg: 'Valid Token'})
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while verifying the token'})
    }
}

const updatePassword = async (req, res) => {
    const {token} = req.params

    try {
        const user = await User.findOne({token})

        if (!user) {
            const error = new Error('Invalid token');
            return res.status(401).json({msg: error.message})
        }

        const {password} = req.body;

        //validate password
        if (!password || password.trim().length < 8) {
            const error = new Error('Password must be at least 8 characters');
            return res.status(400).json({msg: error.message})
        }

        user.token = ""
        user.password = password
        await user.save()
        res.json({msg: 'Password reset successfully'})
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while updating the password'})
    }
}

const user = async (req, res) => {
    const {user} = req
    res.json(
        user
    )
}
const admin = async (req, res) => {
    const {user} = req

    if (!user.admin){
        const error = new Error('Action denied');
        return res.status(403).json({msg: error.message})
    }

    res.json(
        user
    )
}

export {
    signUp,
    ensureDemoUser,
    confirmAccount,
    login,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword,
    user,
    admin
};
