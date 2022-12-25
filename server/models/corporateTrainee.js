import mongoose from "mongoose";
import "dotenv/config";
import jwt from "jsonwebtoken";
import Joi from "joi";

const corporateTraineeSchema = mongoose.Schema({
  firstName: {
    type: String,
    minLength: 3,
  },

  lastName: {
    type: String,
    minLength: 3,
  },

  password: {
    type: String,
    required: true,
  },

  userName: {
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

  dateOfBirth: {
    type: Date,
  },

  phoneNumber: {
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
    },
  ],

  // COURSES WITH ACCESS TO

  // accessRequest:{
  //     type: String,  //requesting a course that I don't have access to
  //     courseName: String,   //or ID
  //     default: null
  // },
});

corporateTraineeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, id: this._id },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export function validate(corporateTrainee) {
  const schema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().min(10),
    dateOfBirth: Joi.date(),
    password: Joi.string().required(),
    address: Joi.object(),
    country: Joi.string(),
    userName: Joi.string().required(),
    //certificate: Joi.array().required(),
  });
  return schema.validate(corporateTrainee);
}

const CorporateTrainee = mongoose.model(
  "CorporateTrainee",
  corporateTraineeSchema
);
export default CorporateTrainee;
