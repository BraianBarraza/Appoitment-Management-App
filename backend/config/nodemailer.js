import nodemailer from 'nodemailer';

const DEFAULT_EMAIL_HOST = 'smtp-relay.brevo.com';
const DEFAULT_EMAIL_PORT = 587;
const DEFAULT_FROM_EMAIL = 'no-reply@appointments.braianbarraza.com';
const DEFAULT_FROM_NAME = 'Appointments Management App';

const getEmailConfig = () => ({
    host: process.env.EMAIL_HOST || DEFAULT_EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || DEFAULT_EMAIL_PORT),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
});

export function getMissingEmailConfig() {
    const config = getEmailConfig();

    return Object.entries(config)
        .filter(([, value]) => !value)
        .map(([key]) => `EMAIL_${key.toUpperCase()}`);
}

export function isEmailConfigured() {
    return getMissingEmailConfig().length === 0;
}

export function createTransport() {
    const config = getEmailConfig();
    const missingConfig = getMissingEmailConfig();

    if (missingConfig.length) {
        throw new Error(`Missing email configuration: ${missingConfig.join(', ')}`);
    }

    return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.port === 465,
        auth: {
            user: config.user,
            pass: config.pass
        }
    });
}

export function getEmailFrom() {
    const fromName = process.env.EMAIL_FROM_NAME || DEFAULT_FROM_NAME;
    const fromEmail = process.env.EMAIL_FROM || DEFAULT_FROM_EMAIL;

    return `${fromName} <${fromEmail}>`;
}

export function getAdminEmail() {
    return process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || DEFAULT_FROM_EMAIL;
}

export function getReplyToEmail() {
    return process.env.EMAIL_REPLY_TO || process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || DEFAULT_FROM_EMAIL;
}
