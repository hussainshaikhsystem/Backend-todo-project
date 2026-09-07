export const errorhandler = (err, req, res, next) => {
    console.error('error', err.message)
    const statuscode = err.statuscode || 500;
    return res.status(statuscode).json({
        success: false,
        message: err.message || 'internal server error'
    })
}