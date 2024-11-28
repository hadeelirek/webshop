const API_KEY = "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";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(API_KEY);


const sendEmail = async (to, subject, text, attachmentBase) => {
    console.log('attachmentBase', attachmentBase?.length);
    try {
        const msg = {
            to,
            from: 'hadielirek@gmail.com',
            subject,
            text,
            html: `<div>${text}</div>`,
            attachments: attachmentBase ? [{
                content: attachmentBase,
                filename: 'GreenMartOrder.pdf',
                type: 'application/pdf',
                disposition: 'attachment',
                content_id: 'mytext'
            },] : [],
        };

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error?.response?.body?.errors);
            });
    } catch (error) {
        console.error('Error sending email:', error?.response?.body?.errors);
    }
};

module.exports = { sendEmail };