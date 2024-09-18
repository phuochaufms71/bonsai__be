import mongoose from "mongoose";
import Comment from "../models/commentModel.js";
import { handleResponseError, handleResponseSuccess } from "../utils/response.js"

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ bonsaiId: req.params.bonsaiId });
        handleResponseSuccess(res, 200, "Get addresses successfully", comments)
    } catch (error) {
        handleResponseError(res, 500, "Internal server error")
        return
    }
}

export const createComment = async (req, res) => {
    const { desc, bonsaiId, email, fullName, avatar } = req.body;
    
    const today = new Date();
    var hours = today.getHours() + 7;
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear(); 
    
    if (!desc) {
        handleResponseError(res, 400, "All fields are required")
        return
    } else {
        const newComment = await Comment.create({ desc, hours, minutes, seconds ,date, month, year, bonsaiId, email, fullName, avatar });
        handleResponseSuccess(res, 201, "Create new comment successfully", { ...newComment._doc })
    }
}

export const updateComment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return 
    }
    const checkCommentByIdInDb = await Comment.findById(id);
    if (!checkCommentByIdInDb) {
        handleResponseError(res, 404, "Comment not found")
        return
    }
    const { desc } = req.body;
    if (!desc) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return 
    }
    await checkCommentByIdInDb.updateOne({ desc })
    const updateComment = await Comment.findById(id);
    handleResponseSuccess(res, 200, "Update comment successfully", { ...updateComment._doc })
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return
    }
    const checkCommentByIdInDb = await Comment.findById(id);
    if (!checkCommentByIdInDb) {
        handleResponseError(res, 404, "Comment not found")
        return
    }
    await Comment.findByIdAndDelete(id)
    handleResponseSuccess(res, 200, "Comment deleted successfully")
}