import mongoose from "mongoose";
import Reply from "../models/replyModel.js";
import { handleResponseError, handleResponseSuccess } from "../utils/response.js"

export const getReply = async (req, res) => {
    try {
        const reply = await Reply.find({ commentId: req.params.commentId });
        handleResponseSuccess(res, 200, "Get addresses successfully", reply)
    } catch (error) {
        handleResponseError(res, 500, "Internal server error")
        return
    }
}

export const createReply = async (req, res) => {
    const { reply, email, fullName, avatar, commentId } = req.body;
    
    const today = new Date();
    var hours = today.getHours() + 7;
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    
    if (!reply) {
        handleResponseError(res, 400, "All fields are required")
        return
    } else {
        const newReply = await Reply.create({ reply, hours, minutes, seconds ,date, month, year, commentId, email, fullName, avatar });
        handleResponseSuccess(res, 201, "Create new comment successfully", { ...newReply._doc })
    }
}

export const updateReply = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return 
    }
    const checkReplyByIdInDb = await Reply.findById(id);
    if (!checkReplyByIdInDb) {
        handleResponseError(res, 404, "Comment not found")
        return
    }
    const { reply } = req.body;
    if (!reply) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return 
    }
    await checkReplyByIdInDb.updateOne({ reply })
    const updateReply = await Reply.findById(id);
    handleResponseSuccess(res, 200, "Update reply successfully", { ...updateReply._doc })
}

export const deleteReply = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return
    }
    const checkRepyByIdInDb = await Reply.findById(id);
    if (!checkRepyByIdInDb) {
        handleResponseError(res, 404, "Reply not found")
        return
    }
    await Reply.findByIdAndDelete(id)
    handleResponseSuccess(res, 200, "Reply deleted successfully")
}