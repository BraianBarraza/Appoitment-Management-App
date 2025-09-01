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

const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2);

export {
    validateObjectId,
    handleNotFoundError,
    uniqueId
}