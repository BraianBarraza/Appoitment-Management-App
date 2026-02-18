import {createTransport} from "../config/nodemailer.js";

const getAdminEmail = () => process.env.ADMIN_EMAIL || 'admin@appointmentApp.com';

export async function sendEmailNewAppointment({date, time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    );

    const info = await transporter.sendMail({
        from: 'AppointmentApp <appointments@appointmentApp.com>',
        to: getAdminEmail(),
        subject: 'Appointment App - New Appointment Scheduled',
        text: 'New Appointment Scheduled',
        html: `<p>A new appointment has been scheduled.</p>
               <p><strong>Date:</strong> ${date}</p>
               <p><strong>Time:</strong> ${time}</p>`
    });

    console.log('Message sent: %s', info.messageId);
}
export async function sendEmailUpdateAppointment({date, time, services}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    );

    const info = await transporter.sendMail({
        from: 'AppointmentApp <appointments@appointmentApp.com>',
        to: getAdminEmail(),
        subject: 'Appointment App - Edited Appointment',
        text: 'Appointment service edited or rescheduled',
        html: `<p>A user has made changes in their Appointment services or schedule.</p>
               <p><strong>Date:</strong> ${date}</p>
               <p><strong>Time:</strong> ${time}</p>
               <p><strong>Services:</strong> ${services}</p>`
    });

    console.log('Message sent: %s', info.messageId);
}

export async function sendEmailDeletedAppointment({date, time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    );

    const info = await transporter.sendMail({
        from: 'AppointmentApp <appointments@appointmentApp.com>',
        to: getAdminEmail(),
        subject: 'Appointment App - Canceled Appointment',
        text: 'Appointment service Canceled',
        html: `<p>A user has canceled an Appointment.</p>
               <p><strong>Date:</strong> ${date}</p>
               <p><strong>Time:</strong> ${time}</p>`
    });

    console.log('Message sent: %s', info.messageId);
}
