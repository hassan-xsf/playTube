


const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve((requestHandler(req,res,next)))
        .catch((err) => next(err))
    }
}
export {asyncHandler}

// const asyncHandler = (fn) => async(req,res,next) => 
// {
//     await fn(req,res,next)
//         .then(() => {

//         })
//         .catch(() => {
//             res.status(err.code || 500).json({
//                 success: false,
//                 message: err.message
//             })
//         })
// }