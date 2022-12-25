import mongoose from 'mongoose'
import Joi from 'joi'

export const courseRequestsSchema = mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    request: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export function validateCourseRequest(courseRequest) {
    const schema = Joi.object({
        courseId: Joi.string().required(),
        courseName: Joi.string().required(),
        userId: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().required(),
        request: Joi.string().required(),
        date: Joi.date()
    });
    return schema.validate(courseRequest);
}

const CourseRequests = mongoose.model("CourseRequests", courseRequestsSchema);
export default CourseRequests;
