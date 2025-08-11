import mongoose from "mongoose";

function validateObjectId(id, res){
    //validate if it is an ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('product ID is invalid');
        return res.status(400).json({
            msg: error.message,
        })
    }
}

function handleNotFoundError(message, res) {
    const error = new Error(message);
    return res.status(400).json({
        msg: error.message,
    })
}

export {
    validateObjectId,
    handleNotFoundError,
}