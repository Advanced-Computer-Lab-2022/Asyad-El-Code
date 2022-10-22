import mongoose from "mongoose";

import Joi from "joi";

const instructorSchema = mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },

  country: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Prefer not to say"],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

export function validate(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().required().min(10),
    dateOfBirth: Joi.date().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    country: Joi.string().required(),
    wallet: Joi.number(),
  });
  return schema.validate(user);
}

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
