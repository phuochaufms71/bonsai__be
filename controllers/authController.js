import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { handleResponseError, handleResponseSuccess } from '../utils/response.js';
import cloudinary from '../utils/cloudinary.js';

dotenv.config();
const saltRound = 10;
const generateAccessToken = (email, password, role) => {
    return jwt.sign({email, password, role}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '2d'})
}

//hash password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRound)
}

//compare password
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

//register
export const register = async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;
    if (!firstName || !lastName || !phone || !email || !password) {
        handleResponseError(res, 400, "Bab request. All fields are required")
        return
    }

    const existedEmail = await User.findOne({email});
    if(existedEmail) {
        handleResponseError(res, 400, "Email is existed")
        return
    }

    const newUser = await User.create({ firstName, lastName, phone, email, password: await hashPassword(password) });
    handleResponseSuccess(res, 201, "Register successfully", {
        firstName,
        lastName,
        phone,
        email,
        role: newUser.role,
        avatar: newUser.avatar
    })
}

//login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }

    const checkEmailUser = await User.findOne({email});
    if (!checkEmailUser) {
        handleResponseError(res, 400, "Email is incorrect")
        return
    }

    const checkPasswordUser = await comparePassword(password, checkEmailUser.password);
    if (!checkPasswordUser) {
        handleResponseError(res, 400, "Password is incorrect")
        return
    }

    const accessToken = generateAccessToken(email, checkEmailUser.password, checkEmailUser.role);
    handleResponseSuccess(res, 200, "Login successfully", {
        email,
        accessToken,
        role: checkEmailUser.role,
        avatar: checkEmailUser.avatar,
        phone: checkEmailUser.phone,
        firstName: checkEmailUser.firstName,
        lastName: checkEmailUser.lastName,
    })
}

//change password
export const changePassword = async (req, res) => {
    const { email, password, newPassword } = req.body;
    if (!email || !password || !newPassword) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }

    const checkEmailUser = await User.findOne({email});
    if (!checkEmailUser) {
        handleResponseError(res, 400, "Email is incorrect")
        return
    }
    
    const checkPasswordUser = await comparePassword(password, checkEmailUser.password);
    if (!checkPasswordUser) {
        handleResponseError(res, 400, "Password is incorrect")
        return
    }
    const hashedNewPassword = await hashPassword(newPassword);
    await User.findOneAndUpdate({email}, { $set: { password: hashedNewPassword}}, {role: checkEmailUser.role})
     
    handleResponseSuccess(res, 200, "Change password successfully")
}

//reset password
export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    const checkEmailUser = await User.findOne({email});
    if (!checkEmailUser) {
        handleResponseError(res, 400, "Email is incorrect")
        return
    }

    const hashedNewPassword = await hashPassword(newPassword)
    await User.findOneAndUpdate({email}, { $set: { password: hashedNewPassword}}, {role: checkEmailUser.role})
    handleResponseSuccess(res, 200, "Reset password successfully")
}

//logout
export const logout = (req, res) => {
    handleResponseSuccess(res, 200, "Logout successfully")
}

export const editUser = async (req, res) => {
    const { email, avatar, firstName, lastName, phone } = req.body;
    if (!email || !firstName || !lastName || !phone) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }

    const checkEmailUser = await User.findOne({email});
    if (!checkEmailUser) {
        handleResponseError(res, 400, "Email is incorrect")
        return
    }

    if (avatar) {
        const uploadRes = await cloudinary.uploader.upload(avatar, {
            upload_preset: "foodWeb"
        })

        if (uploadRes) {
            await checkEmailUser.updateOne({ email, firstName, avatar: uploadRes.secure_url, lastName, phone })

            const editUser = await User.findOne({email})
            handleResponseSuccess(res, 200, "Update account successfully", {...editUser._doc})
        }
    }
}

export const getUser = async (req, res) => {
    const user = await User.find();
    handleResponseSuccess(res, 200, "Get user successfully", user )
}
