import { Resend } from "resend";

const resend = new Resend(process.env.API_KEY_EMAIL_INFRA);

async function sendEmail({ from, to, subject, body }) {
    try {
        const { data, error } = await this.resend.emails.send({
            from,
            to,
            subject,
            html: body
        });

        if (error) {
            throw new Error(error);
        }

        return data;
    } catch (err) {
        console.error("Email sending failed:", err.message);
        throw err;
    }
}

module.exports = { sendEmail };
