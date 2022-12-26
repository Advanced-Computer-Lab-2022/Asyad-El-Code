import mongoose from "mongoose";
import Joi from "joi";

import "dotenv/config";
import jwt from "jsonwebtoken";
import { reportedProblemsSchema } from "./reportedProblems.js";

const administratorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
  },
  lastName: {
    type: String,
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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // reportedProblems:{ type: mongoose.Schema.Types.ObjectId, ref: 'ReportedProblems' }
});

export function validate(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}
administratorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, id: this._id, role: "administrator" },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const Administrator = mongoose.model("Administrator", administratorSchema);
export default Administrator;
