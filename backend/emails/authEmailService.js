import {createTransport} from "../config/nodemailer.js";

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
            process.env.EMAIL_HOST,
            process.env.EMAIL_PORT,
            process.env.EMAIL_USER,
            process.env.EMAIL_PASS
    );

    //send email
    const info = await transporter.sendMail({
        from: 'AppointmentApp <account@app.com>',
        to: email,
        subject: 'Verify your account',
        text: 'Verify your account',
        html: `<p>Hi ${name}, please confirm your account from 'Appointment Management App'</p>
                <p>Your account is almost done, you just have to click in the next link:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${token}">Confirm Account</a>
                <p>if you didn´t create an account, please ignore this message</p>`
    })
}

export async function sendEmailPasswordReset({name, email, token}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    );

    //send email
    const info = await transporter.sendMail({
        from: 'AppointmentApp <account@app.com>',
        to: email,
        subject: 'Reset your password',
        text: 'Reset your password',
        html: `<p>Hi ${name}, do you want to reset your password from 'Appointment Management App'?</p>
                <p>If you have forgotten your password, you just need to click in the next link:</p>
                <a href="${process.env.FRONTEND_URL}/auth/forgot-password/${token}">Reset Password</a>
                <p>if you didn´t request a password reset, please ignore this message</p>`
    })
}