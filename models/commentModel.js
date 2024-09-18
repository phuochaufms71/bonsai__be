import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    desc: {
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
    bonsaiId: { 
        type: String,
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

const Comment = mongoose.model("comments", commentSchema);

export default Comment;