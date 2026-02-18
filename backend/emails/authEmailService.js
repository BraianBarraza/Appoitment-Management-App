import {createTransport} from "../config/nodemailer.js";

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, c => map[c]);
}

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
            process.env.EMAIL_HOST,
            process.env.EMAIL_PORT,
            process.env.EMAIL_USER,
            process.env.EMAIL_PASS
    );

    const safeName = escapeHtml(name);

    //send email
    const info = await transporter.sendMail({
        from: 'AppointmentApp <account@app.com>',
        to: email,
        subject: 'Verify your account',
        text: 'Verify your account',
        html: `<p>Hi ${safeName}, please confirm your account from 'Appointment Management App'</p>
                <p>Your account is almost done, you just have to click in the next link:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${token}">Confirm Account</a>
                <p>if you didn't create an account, please ignore this message</p>`
    })
}

export async function sendEmailPasswordReset({name, email, token}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    );

    const safeName = escapeHtml(name);

    //send email
    const info = await transporter.sendMail({
        from: 'AppointmentApp <account@app.com>',
        to: email,
        subject: 'Reset your password',
        text: 'Reset your password',
        html: `<p>Hi ${safeName}, do you want to reset your password from 'Appointment Management App'?</p>
                <p>If you have forgotten your password, you just need to click in the next link:</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password/${token}">Reset Password</a>
                <p>if you didn't request a password reset, please ignore this message</p>`
    })
}
