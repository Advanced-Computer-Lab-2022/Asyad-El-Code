import mongoose, { mongo } from "mongoose";
import Joi from "joi";

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
  outlines: {
    type: [
      {
        outline: String,
        totalHours: Number,
        subtitles: [
          {
            subtitle: String,
            minutes: Number,
            videoUrl: String,
          },
        ],
        exercises: [
          {
            question: String,
            answers: [{ answer: String, correct: Boolean }],
          },
        ],
      },
    ],
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  instructor: {
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
    name: String,
  },
  promotion: {
    discount: { type: Number, default: 0.0 },
    startDate: Date,
    endDate: Date,
  },
  // add instructor
  discount: [{ country: String, percent: Number }],
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
    outlines: Joi.array().required(),
    previewVideo: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.array(),
  });
  return schema.validate(course, { allowUnknown: true });
}

const Course = mongoose.model("Course", courseSchema);

export default Course;
