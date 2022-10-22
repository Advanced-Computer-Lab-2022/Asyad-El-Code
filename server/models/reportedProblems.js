import mongoose from 'mongoose'
import Joi from 'joi'

export const reportedProblemsSchema = mongoose.Schema({
    problem: {
        type: String,
        required: true
    },
    reporter: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export function validate(user) {
    const schema = Joi.object({
        problem: Joi.string().required(),
        reporter: Joi.string().required(),
        date: Joi.date()
    });
    return schema.validate(user);
}

const ReportedProblems = mongoose.model("ReportedProblem",reportedProblemsSchema);
export default ReportedProblems;
