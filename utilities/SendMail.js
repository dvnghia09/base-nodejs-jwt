const nodeMailer = require('nodemailer');

const SendMail = async (to, subject, htmlContent) => {
 try {
     const transport = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
     });

     await transport.sendMail ({
        from: process.env.MAIL_FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent,
     });
 }
    catch (error) {
        console.log(error, "Email not sent");
    }

}

module.exports = SendMail;