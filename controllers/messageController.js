import Message from "../models/messageModel.js";
import { handleResponseError, handleResponseSuccess } from "../utils/response.js";
import sendMail from "../utils/send.mail.js";

export const getMessages = async(req, res) => {
    try {
        const messages = await Message.find()
        handleResponseSuccess(res, 200, "Get foods successfully",  messages)
    } catch (error) {
        handleResponseError(res, 500, "Internal server error")
        return
    }
}

export const createMessage = async (req, res) => {
    const { name, email, message, avatar } = req.body;
    if (!name || !email || !message) {
        handleResponseError(res, 400, "All fields are required")
        return
    }
    const today = new Date();
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    const newMessage = await Message.create({ avatar, name, email, message, date, month, year, hours, minutes, seconds });
    handleResponseSuccess(res, 201, "Send message successfully", {...newMessage._doc})

    await sendMail({
        name,
        email,
        subject: "Phản hồi của khách hàng",
        html: `
            <h3>Tên: ${name}</h3>
            <h3>Email: ${email}</h3>
            <p>Vấn đề: ${message}</p>
        `
    })
}