import mongoose, { mongo } from "mongoose";

export const exerciseSchema = mongoose.Schema({
  arrayOfQuestionsAndAnswers: [
    { question: String, answers: [{ answer: String, correct: Boolean }] },
  ],
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
