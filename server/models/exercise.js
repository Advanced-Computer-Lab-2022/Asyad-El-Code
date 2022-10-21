import mongoose, { mongo } from "mongoose";

import Joi from "joi";
import Course from "./course.js";

const exerciseSchema = mongoose.Schema({
  questions: [
    { title: String, answers: [{ answer: String, correct: Boolean }] },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

export function validate(course) {
  const schema = Joi.object({
    questions: Joi.array().required(),
    course: Joi.string().required(),
  });
  return schema.validate(course, { allowUnknown: true });
}

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
