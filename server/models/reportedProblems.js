import mongoose from 'mongoose'
import Joi from 'joi'

export const reportedProblemsSchema = mongoose.Schema({

    reporterEmail: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "pending"
    },

    date: {
        type: Date,
        default: Date.now
    }
});

export function validate(user) {
    const schema = Joi.object({
        reporterEmail: Joi.string().required(),
        type: Joi.string().required(),
        details: Joi.string().required(),
        status: Joi.string(),
        date: Joi.date()
    });
    return schema.validate(user);
}

const ReportedProblems = mongoose.model("ReportedProblem",reportedProblemsSchema);
export default ReportedProblems;
