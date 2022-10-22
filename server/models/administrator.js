import mongoose from 'mongoose'
import Joi from 'joi'

const administratorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

export function validate(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        userName: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(user);
}

const Administrator = mongoose.model("Administrator", administratorSchema);
export default Administrator;