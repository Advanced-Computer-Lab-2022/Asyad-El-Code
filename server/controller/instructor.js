import mongoose from "mongoose";
import Instructor from "../models/instructor.js";
import Course from "../models/course.js";
import { validateInstructor } from "../models/instructor.js";
import { validateCourse } from "../models/course.js";
import bcrypt from "bcryptjs";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

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
    console.log("HENAAA");
    res.status(401).send(error.message); //test
  }
};

export const getInstructors = async (_req, res) => {
  try {
    const instructors = await Instructor.find();
    return res.status(200).send(instructors);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(
      mongoose.Types.ObjectId(req.params.id)
    );
    if (!instructor) return res.status(404).send("Instructor not found");
    return res.status(200).send(instructor);
  } catch (error) {
    res.status(400).send(error.message);
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
  try {
    const { firstName, lastName, country, phoneNumber, biography } = req.body;
    const { id } = req.params;
    const castedid = mongoose.Types.ObjectId(id);
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      castedid,
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          country: country,
          phoneNumber: phoneNumber,
          biography: biography,
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

export const firstLogin = async (req, res) => {
  try {
    const { firstName, lastName, country, password, gender } = req.body;
    const { id } = req.params;
    const castedid = mongoose.Types.ObjectId(id);
    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      castedid,
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          country: country,
          password: hashedPassword,
          gender:gender,
          firstLogin: false,
        },
      },
      { new: true }
    );
    const token = await updatedInstructor.generateAuthToken();
    res.status(200).send({ result:updatedInstructor, token ,type:"instructor"});
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.send;
};

export const getAllInstructorCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const castedid = mongoose.Types.ObjectId(id);
    console.log(id);
    // const courses = await Course.find({ "instructor.instructorId": id });
    const courses = await Course.aggregate([
      { $match: { "instructor.instructorId": castedid } },
      {
        $addFields: {
          discountedPrice: {
            $cond: [
              {
                $and: [
                  { $lte: ["$promotion.startDate", new Date(Date.now())] },
                  { $gte: ["$promotion.endDate", new Date(Date.now())] },
                ],
              },
              {
                $multiply: [
                  "$price",
                  { $subtract: [1, "$promotion.discount"] },
                ],
              },
              "$price",
            ],
          },
        },
      },
    ]);
    console.log(courses);
    if (!courses) {
      res.status(404).send("Cannot find Courses for this instructor");
    }
    res.status(200).send(courses);
  } catch (err) {
    console.log("LOOK");
    res.status(401).send(err.message);
  }
};

export const filterInstructorCourses = async (req, res) => {
  try {
    const { id, subject, price, rating } = req.query;
    const subjectArray = subject.split(/[,]+/);
    const priceArray = price.split(/[,]+/);
    const ratingArray = rating.split(/[,]+/);
    // const courses = await Course.find({ "instructor.instructorId": id })
    //   .and({
    //     subject: { $in: subjectArray },
    //   })
    //   .and({ price: { $lte: parseInt(priceArray[1]) } })
    //   .and({ price: { $gte: parseInt(priceArray[0]) } })
    //   .and({ rating: { $lte: parseInt(ratingArray[1]) } })
    //   .and({ rating: { $gte: parseInt(ratingArray[0]) } });
    const courses = await Course.aggregate([
      { $match: { "instructor.instructorId": mongoose.Types.ObjectId(id) } },
      { $match: { subject: { $in: subjectArray } } },
      { $match: { rating: { $lte: parseInt(ratingArray[1]) } } },
      { $match: { rating: { $gte: parseInt(ratingArray[0]) } } },
      {
        $addFields: {
          discountedPrice: {
            $cond: [
              {
                $and: [
                  { $lte: ["$promotion.startDate", new Date(Date.now())] },
                  { $gte: ["$promotion.endDate", new Date(Date.now())] },
                ],
              },
              {
                $multiply: [
                  "$price",
                  { $subtract: [1, "$promotion.discount"] },
                ],
              },
              "$price",
            ],
          },
        },
      },
      { $match: { discountedPrice: { $lte: parseInt(priceArray[1]) } } },
      { $match: { discountedPrice: { $gte: parseInt(priceArray[0]) } } },
    ]);

    if (!courses) {
      res.status(404).send("Cannot find Courses for this instructor");
    }
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
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
export const updateRating = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const { rating } = req.body;
    const instructor = await Instructor.findById(id);
    if (!instructor) return res.status(404).send("instructor not found");
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      { rating: rating },
      { new: true }
    );
    res.status(200).send(updatedInstructor);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// export const addMoneyToInstructorWallet = async (req, res) => {
//   try{
//     const{courseId,instructorId} = req.params;
//     console.log("INSTRUCTOR ID ");
//     const charges = await stripe.charges.list({
//       limit: 1,
//       created: "desc",
//     });
//     const charge = charges.data[0];
//     const amount = charge.amount;

//   }catch(error){
//     res.status(400).send(error.message);
//   }
// }
export const definePromotion = async (req, res) => {
  try {
    const { courseId, discount, startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: {
          promotion: {
            discount: discount / 100,
            startDate: start,
            endDate: end,
          },
        },
      },
      { new: true }
    );
    if (!updatedCourse) return res.status(404).send("course not found");
    res.status(200).send(updatedCourse);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
