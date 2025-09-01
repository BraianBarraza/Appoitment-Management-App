import {createTransport} from "../config/nodemailer.js";

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
        'sandbox.smtp.mailtrap.io',
        '2525',
        'd87a9e72ffc148',
        'fe3e4d128e0c2c'
    );

    //send email
    const info = await transporter.sendMail({
        from: 'AppointmentApp',
        to: email,
        subject: 'Verify your account',
        text: 'Verify your account',
        html: `<p>Hi ${name}, please confirm your account from 'Appointment Management App'</p>
                <p>Your account is almost done, you just have to click in the next link:</p>
                <a href="http://localhost:4000/api/auth/verify/${token}">Confirm Account</a>
                <p>if you didn´t create an account, please ignore this message</p>`
    })

    console.log('Message sent: %s', info.messageId);
}