import jwt from "jsonwebtoken";
import { handleResponseError } from "../utils/response.js";

export const authAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        handleResponseError(res, 401, "Invalid authorization")
        return
    }
    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
        handleResponseError(res, 401, "Invalid access token")
        return
    }

    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)
    if (user.role !== "admin") {
        handleResponseError(res, 403, "Forbidden")
        return
    }
    next()
}