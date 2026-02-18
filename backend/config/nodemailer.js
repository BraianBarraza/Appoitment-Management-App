import nodemailer from 'nodemailer';

export function createTransport(host, port, user, pass) {
    return nodemailer.createTransport({
        host,
        port: Number(port),
        secure: Number(port) === 465,
        auth: {
            user,
            pass
        }
    });
}
