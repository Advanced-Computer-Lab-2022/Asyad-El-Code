import mongoose from "mongoose";
import Exercise from "../models/exercise.js";
import { validate } from "../models/exercise.js";

export const createExercise = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { questions, course } = req.body;

  try {
    const exercise = await new Exercise({
      questions: questions,
      course: course,
    });
    await exercise.save();
    res.status(200).json(exercise);
  } catch (error) {
    res.send(error.message);
  }
};
