import mongoose from "mongoose";
import Instructor from "../models/instructor.js";
import Course from "../models/course.js";
import { validateInstructor } from "../models/instructor.js";
import { validateCourse } from "../models/course.js";

export const createInstructor = async (req, res) => {
  const { error } = validateInstructor(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    userName,
    firstName,
    lastName,
    email,
    gender,
    password,
    country,
    dateOfBirth,
    wallet,
    phoneNumber,
  } = req.body;

  try {
    const instructor = await new Instructor({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      password: password,
      country: country,
      dateOfBirth: dateOfBirth,
      wallet: wallet,
      phoneNumber: phoneNumber,
    });
    await instructor.save();
    res.status(200).json(instructor);
  } catch (error) {
    res.send(error.message); //test
  }
};

export const viewCourseTitles = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const courses = await Course.find();
    for (let i = 0; i < courses.length; i++) {
      let instructorId = courses[i].instructorId;
      if (instructorId && instructorId.toString() == id) {
        return res.status(200).send(courses[i]);
      }
    }
    return res.status(200).send({ message: "No courses found" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const addNewCourse = async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { id } = req.params;
  const {
    title,
    summary,
    subject,
    duration,
    releaseDate,
    language,
    image,
    rating,
    previewVideo,
    outline,
    excercises,
    price,
  } = req.body;

  try {
    const course = await new Course({
      title: title,
      summary: summary,
      subject: subject,
      duration: duration,
      releaseDate: releaseDate,
      language: language,
      image: image,
      rating: rating,
      previewVideo: previewVideo,
      outline: outline,
      excercises: excercises,
      price: price,
      instructorId: id,
    });
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.send(error.message); //test
  }
};

export const filterCourseBySubjectAndPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, minPrice, maxPrice } = req.body;
    const courses = await Course.find({ instructorId: id }).or([
      { subject: subject },
      { price: { $lte: maxPrice, $gte: minPrice } },
    ]);
    if (!courses) return res.status(200).send({ message: "No course found" });
    return res.status(200).send(courses);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const selectCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = req.body.country;
    const updated = await Instructor.findByIdAndUpdate(
      id,
      { country: country },
      { new: true }
    );
    if (!updated) {
      res.status(401).send("Couldn't select country");
    } else res.status(200).send(updated);
  } catch (err) {
    res.status(401).send(err);
  }
};

export const updateInformation = async (req, res) => {
  const { error } = validateInstructor(req.body);
  if (error) res.status(401).send(error.details[0].message);
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      country,
      dateOfBirth,
      phoneNumber,
    } = req.body;
    const { id } = req.params;

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          country: country,
          dateOfBirth: dateOfBirth,
          phoneNumber: phoneNumber,
        },
      },
      { new: true }
    );
    res.status(200).send(updatedInstructor);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.send;
};

export const searchByTitleOrSubject = async (req, res) => {
  try {
    const { title, subject } = req.query;
    const { id } = req.params.id;
    const courses = await Course.find({ "instructor.instructorId": id }).or([
      { title: title },
      { subject: subject },
    ]);

    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
