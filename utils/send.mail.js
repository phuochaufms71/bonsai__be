import nodemailer from "nodemailer";

const sendMail = async ({name, email, subject, html}) => {
    const transposter = nodemailer.createTransport({
        host: email,
        service: "Gmail",
        auth: {
            user: process.env.ACCOUNT_APP_EMAIL,
            pass: process.env.PASS_APP_EMAIL
        }
    })

    const message = {
        from: name,
        to: process.env.ACCOUNT_APP_EMAIL,
        subject,
        html
    }

    const result = await transposter.sendMail(message)
    return result;
};

export default sendMail;