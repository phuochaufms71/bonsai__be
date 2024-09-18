import mongoose from "mongoose";

const replySchema = mongoose.Schema({
    reply: {
        type: String,
        require: true
    },
    date: {
        type: String,
    },
    month: {
        type: String,
    },
    year: {
        type: String,
    },
    hours: {
        type: String
    },
    minutes: {
        type: String
    },
    seconds: {
        type: String
    },
    commentId: { 
        type: String
    },
    email: {
        type: String
    },
    fullName: {
        type: String
    },
    avatar: {
        type: String
    }
});

const Reply = mongoose.model("replies", replySchema);

export default Reply;