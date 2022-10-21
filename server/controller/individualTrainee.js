import mongoose from "mongoose";
import indvidualTrainee from "../models/individualTrainee.js";
import { validate } from "../models/individualTrainee.js";

export const createIndvidualTrainee = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    firstName,
    lastName,
    email,
    billingDetails,
    password,
    country,
    dateOfBirth,
    certificate,
    phoneNumber,
    //courses,
    problem,
    //grade,
    //percentageCompleted,
    universityOrSchool,
    address
  } = req.body;

  try {
    const individualtrainee = await new indvidualTrainee({
      firstName: firstName,
      lastName: lastName,
      email: email,
      billingDetails: billingDetails,
      password: password,
      country: country,
      dateOfBirth: dateOfBirth,
      certificate: certificate,
      phoneNumber: phoneNumber,
      //grade:grade,
      problem:problem,
      //percentageCompleted:percentageCompleted,
      universityOrSchool:universityOrSchool,
      address:address,

    });
    await individualtrainee.save();
    res.status(200).json(individualtrainee);
  } catch (error) {
    res.send(error.message);
  }
};
