import mongoose from "mongoose";

import Joi from "joi";
import "dotenv/config";
import jwt from "jsonwebtoken";

const individualTraineeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  gender: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  country: {
    type: String,
  },

  billingDetails: {
    masterCardNumber: String,
    expiryDate: Date,
    cvv: String,
    cardOwner: String,
  },

  dateOfBirth: {
    type: Date,
  },

  phoneNumber: {
    type: String,
  },

  university: {
    type: String,
  },

  address: {
    city: String,
    streetName: String,
    streetNumber: String,
  },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      title: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      releaseDate: {
        type: Date,
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
      instructor: {
        instructorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Instructor",
        },
        name: String,
      },
      grades: [
        {
          score: Number,
          total: Number,
          exerciseId: mongoose.Schema.Types.ObjectId,
        },
      ],
      notes: [
        {
          subtitleId: mongoose.Schema.Types.ObjectId,
          note: [{ value: String, time: Number }],
        },
      ],
      seenContent: [
        { duration: Number, contentId: mongoose.Schema.Types.ObjectId },
      ],
      certificateReceived: { type: Boolean, default: false },
    },
  ],
});

individualTraineeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, id: this._id, role: "individualTrainee" },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

export function validate(individualTrainee) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().min(10),
    dateOfBirth: Joi.date().required(),
    password: Joi.string().required(),
    address: Joi.object(),
    country: Joi.string(),
    university: Joi.string(),
    billingDetails: Joi.object({
      masterCardNumber: Joi.string().required(),
      expiryDate: Joi.date().required(),
      cvv: Joi.string().required(),
    }),
  });
  return schema.validate(individualTrainee);
}

const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  individualTraineeSchema
);
export default IndividualTrainee;
