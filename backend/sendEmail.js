// const nodemailer = require('nodemailer');

// // transporter object using SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'outlook',
//     auth: {
//         user: 'GreenAndDelightfulMart@outlook.com', // Outlook email address
//         pass: 'berrYinSkY9779' // Outlook password
//     }
// });

// const sendEmail = async (to, subject, text, attachmentPath) => {
//     const mailOptions = {
//         from: 'GreenAndDelightfulMart@outlook.com',
//         to: to,
//         subject: subject,
//         text: text,
//         attachments: attachmentPath ? [
//             {
//                 filename: 'order-details.pdf',
//                 path: attachmentPath
//             }
//         ] : []
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent');
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// module.exports = { sendEmail };


const MSToken = "mlsn.cc0efb0e4d5a83358d293350b42b85b6cd52c35fac216660d8fcb78433cc75ae";
const { MailerSend, EmailParams, Sender, Recipient, Attachment } = require("mailersend");

const sendEmail = async (to, subject, text, cusName, base64String) => {
    const mailersend = new MailerSend({
        apiKey: MSToken,
    });

    const sentFrom = new Sender("greenanddelightfulmart@trial-pxkjn41rze5gz781.mlsender.net", "Green and delightful mart");

    const recipients = [
        new Recipient(to, cusName)
    ];

    const attachments = base64String && base64String.length ? [
        new Attachment(
            base64String,
            'order-details.pdf',
            'attachment'
        )
    ] : [];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setAttachments(attachments)
        .setSubject(subject)
        .setHtml(text)
        .setText(text);

    try {
        await mailersend.email.send(emailParams);
    } catch (error) {
        console.log('e', error);
    };
};

module.exports = { sendEmail };