import {createTransport} from "../config/nodemailer.js";

export async function sendEmailNewAppointment({date, time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    );

    const info = await transporter.sendMail({
        from: 'AppointmentApp <appointments@appointmentApp.com>',
        to: 'admin@appointmentApp.com',
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
        to: 'admin@appointmentApp.com',
        subject: 'Appointment App - Edited Appointment',
        text: 'Appointment service edited or rescheduled',
        html: `<p> A user had made changes in his Appointment services or schdule.</p>
               <p><strong>Date:</strong> ${date}</p>
               <p><strong>Time:</strong> ${time}</p>
                <!--TODO: Confirm Services by Name-->
               <p><strong>Services-Code:</strong> ${services}</p>`
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
        to: 'admin@appointmentApp.com',
        subject: 'Appointment App - Canceled Appointment',
        text: 'Appointment service Canceled',
        html: `<p> A user had canceled an Appointment.</p>
               <p><strong>Date:</strong> ${date}</p>
               <p><strong>Time:</strong> ${time}</p>`
    });

    console.log('Message sent: %s', info.messageId);
}