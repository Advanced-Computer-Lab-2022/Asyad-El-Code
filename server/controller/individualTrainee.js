import mongoose from "mongoose";
import indvidualTrainee from "../models/individualTrainee.js";
import IndividualTrainee, { validate } from "../models/individualTrainee.js";
import Course from "../models/course.js";
import Types from "mongoose";

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
    //certificate,
    phoneNumber,
    //courses,
    //problem,
    //grade,
    //percentageCompleted,
    university,
    address,
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
      //certificate: certificate,
      phoneNumber: phoneNumber,
      //grade:grade,
      //problem:problem,
      //percentageCompleted:percentageCompleted,
      university: university,
      address: address,
    });
    await individualtrainee.save();
    res.status(200).json(individualtrainee);
  } catch (error) {
    res.send(error.message);
  }
};

export const getAllIndividualTrainees = async (req, res) => {
  const indvidTrainees = await indvidualTrainee.find();
  res.send(indvidTrainees);
};

//findbyid or just find?
export const getIndividualTrainees = async (req, res) => {
  try {
    const indvidTrainee = await indvidualTrainee.findById(req.params.id);
    if (!indvidTrainee) return res.status(404).send("This id doesnt exist");
    res.send(indvidTrainee);
  } catch (error) {
    res.send(error.message + "id is not valid");
  }
};

export const deleteIndividualTrainee = async (req, res) => {
  try {
    const deletedIndvidTrainee = await indvidualTrainee.findById(req.params.id);
    if (!deletedIndvidTrainee)
      return res.status(404).send("This id doesnt exist");
    await indvidualTrainee.deleteOne({ _id: req.params.id });
    res.status(200).send(deletedIndvidTrainee);
  } catch (error) {
    res.send(error.message + "id is not valid");
  }
};

export const updateIndividualTrainee = async (req, res) => {
  try {
    const IndvidTrainee = await indvidualTrainee.findById(req.params.id);
    if (!IndvidTrainee) return res.status(404).send("This id doesnt exist");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newIndvidualTrainee = await indvidualTrainee.findByIdAndUpdate(
      req.params.id,
      {
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        address: req.body.address,
        university: req.body.university,
      },
      { new: true }
    );
    res.send(newIndvidualTrainee);
  } catch (error) {
    res.send("This id doesnt exist");
  }
};


export const selectCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = req.body.country;
    const updated = await IndividualTrainee.findByIdAndUpdate(id, { country: country }, { new: true })
    if (!updated) {
      res.status(401).send("Couldn't select country")
    } else
      res.status(200).send(updated);

  } catch (err) {
    res.status(401).send(err)
  }
};
export const enrollCourse = async (req, res) => {
  try {
    const { id, courseId } = req.body;
    const courseIdCasted =await mongoose.Types.ObjectId(courseId);
    const idCasted = await mongoose.Types.ObjectId(id);
    console.log(id)
    console.log(idCasted)
    console.log(courseIdCasted)
    const { title, summary, duration, releaseDate, image, rating, instuctor } = await Course.findById(courseIdCasted );
    const user = await IndividualTrainee.findById(idCasted)
    const updatedUser = await IndividualTrainee.findByIdAndUpdate(idCasted, {
      courses: [...user.courses, {
        title,
        summary,
        duration,
        releaseDate,
        image,
        rating,
        instuctor
      }]
    }, { new: true })
    if (!updatedUser) {
      res.status(401).send("Couldn't enroll course")
    } else
      res.status(200).send(updatedUser);

  } catch (err) {
    res.status(401).json({ error: err.message })
  }
};