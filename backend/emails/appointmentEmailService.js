import {createTransport, getAdminEmail, getEmailFrom, getReplyToEmail} from "../config/nodemailer.js";

export async function sendEmailNewAppointment({date, time}) {
    const transporter = createTransport();

    const info = await transporter.sendMail({
        from: getEmailFrom(),
        replyTo: getReplyToEmail(),
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
    const transporter = createTransport();

    const info = await transporter.sendMail({
        from: getEmailFrom(),
        replyTo: getReplyToEmail(),
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
    const transporter = createTransport();

    const info = await transporter.sendMail({
        from: getEmailFrom(),
        replyTo: getReplyToEmail(),
        to: getAdminEmail(),
        subject: 'Appointment App - Canceled Appointment',
        text: 'Appointment service Canceled',
        html: `<p>A user has canceled an Appointment.</p>
               <p><strong>Date:</strong> ${date}</p>
               <p><strong>Time:</strong> ${time}</p>`
    });

    console.log('Message sent: %s', info.messageId);
}
