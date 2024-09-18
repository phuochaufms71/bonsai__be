import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    month: {
        type: String,
        require: true
    },
    year: {
        type: String,
        require: true
    },
    hours: {
        type: String,
        require: true
    },
    minutes: {
        type: String,
        require: true
    },
    seconds: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
});

const Message = mongoose.model('message', messageSchema);
export default Message;