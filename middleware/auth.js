import { handleResponseError } from '../utils/response.js';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
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
    if (!user) {
        handleResponseError(res, 401, "Invalid access token")
        return
    }
    next()
}