import mongoose, { mongo } from "mongoose";
import Joi from "joi";
import Instructor from "./instructor.js";
export const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  // department: {
  //   type: String,
  //   required: true,
  // }, later
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  previewVideo: {
    type: String,
    required: true,
  },
  outline: {
    type: [String],
    required: true,
  },
  excercises: [
    {
      questions: [
        { title: String, answers: [{ answer: String, correct: Boolean }] },
      ],
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  instructors: { type: [mongoose.Schema.Types.ObjectId], ref: "Instructor" },
  // promotion: {
  //   type: Number,
  //   default: 0.0,
  // },later
  // add instructor
});

export function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    summary: Joi.string().min(3).required(),
    subject: Joi.string().min(3).required(),
    duration: Joi.number().required(),
    releaseDate: Joi.date().required(),
    language: Joi.string().required(),
    image: Joi.string().required(),
    rating: Joi.number(),
    previewVideo: Joi.string().required(),
    excercises: Joi.array().required(),
    price: Joi.number().required(),
  });
  return schema.validate(course, { allowUnknown: true });
}

const Course = mongoose.model("Course", courseSchema);

export default Course;
