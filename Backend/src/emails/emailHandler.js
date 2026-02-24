import { resendClient, sender } from "../lib/resend.js";

export const sendEmail = async (email, name) => {
    const { data, error } = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to: email,
        subject: "hamari app pay aao or wapis jao",
        html: `<h1>Welcome ${name} sb</h1>`
    });
    if (error) {
        console.error('Error in email sending :', error);
        throw new Error('Failed to send welcome email');
    }

    console.log('Email send successfully ', data);

};