import mongoose from "mongoose";
import Joi from "joi";
//Create refund schema which contains the following fields
//1- individualTraineeId
//2- corporateTraineeId
//3- courseId
//4- courseName
//5- refundReason
//6- refundDate
//FirstName
//LastName
//Email
//Create the schema
export const refundSchema = mongoose.Schema({
  individualTraineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IndividualTrainee",
  },
  corporateTraineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CorporateTrainee",
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  courseName: {
    type: String,
    required: true,
  },
  refundDate: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  refundReason: {
    type: String,
    required: true,
  },
  refundType: {
    type: String,
    required: true,
  },
});
//Create a function to validate the refund schema
export const Refund = mongoose.model("Refund", refundSchema);
