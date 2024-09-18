export const handleResponseSuccess = (res, statusCode, message, data={}) => {
    res.status(statusCode).json({
        error: false,
        message,
        data
    })
}

export const handleResponseError = (res, statusCode, message) => {
    res.status(statusCode).json({
        error: true,
        message,
    })
}