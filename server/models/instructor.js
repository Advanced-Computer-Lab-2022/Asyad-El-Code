import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const instructorSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
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
    unique: true,
    required: true,
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
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to say"],
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  ratings: [
    {
      corporateTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CorporateTrainee",
      },
      individualTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualTrainee",
      },
      rating: Number,
    },
  ],
  reviews: [
    {
      corporateTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CorporateTrainee",
      },
      individualTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualTrainee",
      },
      review: String,
    },
  ],
  about: {
    type: String,
  },
  biography: {
    type: String,
    default: "No biography",
  },
  firstLogin: {
    type: Boolean,
    default: true,
  },
  ratings: [
    {
      corporateTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CorporateTrainee",
      },
      individualTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualTrainee",
      },
      rating: Number,
    },
  ],
  reviews: [
    {
      corporateTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CorporateTrainee",
      },
      individualTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualTrainee",
      },
      review: String,
    },
  ],
});

instructorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, id: this._id, role: "instructor" },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

export function validateInstructor(user) {
  const schema = Joi.object({
    userName: Joi.string().min(5),
    password: Joi.string().required(),
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().min(10),
    dateOfBirth: Joi.date(),
    gender: Joi.string(),
    country: Joi.string(),
    about: Joi.string(),
  });
  return schema.validate(user);
}

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
