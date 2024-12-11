import { isValidObjectId } from "mongoose"


const validateId = (req, res, next) => {
    if (isValidObjectId) {
        next();
    } else {
        res.status(500);
        throw new Error(`Invalid objectId of ${req.params.id}`);
        
    }
}

export default validateId;