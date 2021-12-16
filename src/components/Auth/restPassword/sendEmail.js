const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'lilly.monahan17@ethereal.email',
                pass: 'mm97rMab3e9BBMvbD3',
            },
        });

        await transporter.sendMail({
            from: 'Mailer test <lilly.monahan17@ethereal.email>',
            to: email,
            subject,
            text,
        });

        console.log('email sent sucessfully');
    } catch (error) {
        console.log(error, 'email not sent');
    }
};

module.exports = sendEmail;
