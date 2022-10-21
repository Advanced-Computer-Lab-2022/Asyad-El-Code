import mongoose from "mongoose";
import CorporateTrainee from "../models/corporateTrainee.js";
import { validate } from "../models/corporateTrainee.js";

export const createCorporateTrainee = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    firstName,
    lastName,
    email,
    password,
    country,
    dateOfBirth,
    //certificate,
    phoneNumber,
    //courses,
    //problem,
    //grade,
    //percentageCompleted,
    address,
    //accessRequest
  } = req.body;

  try {
    const corporatetrainee = await new CorporateTrainee({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      country: country,
      dateOfBirth: dateOfBirth,
      //certificate: certificate,
      phoneNumber: phoneNumber,
      //grade:grade,
      //problem:problem,
      //percentageCompleted:percentageCompleted,
      address:address,
      //acessRequest: acessRequest,

    });
    await corporatetrainee.save();
    res.status(200).json(corporatetrainee);
  } catch (error) {
    res.send(error.message);
  }
};
