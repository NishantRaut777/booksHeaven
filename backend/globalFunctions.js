const nodemailer = require("nodemailer");

async function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function validatePassword(password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    return passwordRegex.test(password);
}

async function sendVerificationEmail(req, res, name, email,verificationToken){
    try {
        // Send verification email
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const verificationURL = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Hello ${name},</p>
               <p>Please verify your email by clicking the link below:</p>
               <a href="${verificationURL}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);

        return true;
    } catch (error) {
        console.log(error);
        return res.status(400).send({ 
            message: "Something went wrong while sending verification email",
            success: false,
         })
    }
    
}

module.exports = { validateEmail, validatePassword, sendVerificationEmail };