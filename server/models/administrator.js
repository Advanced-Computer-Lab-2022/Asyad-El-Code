import mongoose from 'mongoose'
import Joi from 'joi'
import {reportedProblemsSchema} from './reportedProblems.js';

const administratorSchema = new mongoose.Schema({
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
    },
    // reportedProblems:{ type: mongoose.Schema.Types.ObjectId, ref: 'ReportedProblems' }
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