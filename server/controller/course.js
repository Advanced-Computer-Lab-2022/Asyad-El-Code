import mongoose from "mongoose";
import Course from "../models/course.js";
import { validateCourse } from "../models/course.js";
import Instructor from "../models/instructor.js";
import IndividualTrainee from "../models/individualTrainee.js";
import CorporateTrainee from "../models/corporateTrainee.js";
import { Refund } from "../models/refund.js";
import nodemailer from "nodemailer";
import path from "path";

export const createCourse = async (req, res) => {
  // const { error } = validateCourse(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

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
    price,
    outlines,
    instructor,
    discount,
  } = req.body;

  console.log(req.body.outlines);
  try {
    const course = await new Course({
      title,
      summary,
      subject,
      duration,
      releaseDate,
      language,
      image,
      rating,
      previewVideo,
      outlines: [...outlines],
      price,
      instructor,
      discount,
    });

    console.log("Iamhere man man amn");
    await course.save();
    console.log("Iasdsd");
    res.status(200).json(course);
  } catch (error) {
    res.send(error.message); //test
  }
};

//guest/instructor/individual trainee/corporate trainee
export const getCoursesDetails = async (_req, res) => {
  try {
    const courses = await Course.find().select({
      title: 1,
      duration: 1,
      rating: 1,
    });
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
};

export const getCourse = async (req, res) => {
  try {
    const { courseId } = req.query;
    const courses = await Course.findById(courseId);
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
};

//guest/instructor/individual trainee
export const getPriceOfCourses = async (_req, res) => {
  try {
    const courses = await Course.find().select({ price: 1 });
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
};

//guest/instructor/individual trainee
export const getCourseInformation = async (req, res) => {
  try {
    const id = req.params.id;
    const courses = await Course.findById(id).select({
      subTitles: 1,
      exercises: 1,
      duration: 1,
      price: 1,
      discount: 1,
    });
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
};

//guest/instructor/individual trainee
export const filterBasedOnPrice = async (req, res) => {
  const courses = await Course.find({
    price: { $lte: parseInt(req.body.max) },
  }).and({
    price: { $gte: parseInt(req.body.min) },
  });
  res.send(courses);
};

//TODO search for a course based on course title or subject or instructor
//guest/instructor/individual trainee /corporate trainee
export const findCourseBySubjectAndRating = async (req, res) => {
  try {
    const { subject, rating } = req.body;
    const courses = await Course.find().or([
      { rating: rating },
      { subject: subject },
    ]);
    if (!courses) return res.status(200).send({ message: "No course found" });
    return res.status(200).send(courses);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const searchByTitleOrSubjectOrInstructor = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    console.log(searchQuery);
    const titleRgx = new RegExp(searchQuery, "i");
    const subjectRgx = new RegExp(searchQuery, "i");
    const instructorRgx = new RegExp(searchQuery, "i");
    console.log(instructorRgx);
    // const instructorID = await Instructor.find({
    //   $or: [{ userName: instructorRgx }],
    // }).select("_id");

    const courses = await Course.find({
      $or: [
        { title: titleRgx },
        { subject: subjectRgx },
        {
          "instructor.name": {
            $in: instructorRgx,
          },
        },
      ],
    });
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const getAllCourses = async (_req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send(err);
  }
};

export const filterAllCourses = async (req, res) => {
  try {
    const { subject, price, rating } = req.query;
    const subjectArray = subject.split(/[,]+/);
    const priceArray = price.split(/[,]+/);
    const ratingArray = rating.split(/[,]+/);

    // const courses = await Course.find({
    //   subject: { $in: subjectArray },
    // })
    //   .and({ price: { $lte: parseInt(priceArray[1]) } })
    //   .and({ price: { $gte: parseInt(priceArray[0]) } })
    //   .and({ rating: { $lte: parseInt(ratingArray[1]) } })
    //   .and({ rating: { $gte: parseInt(ratingArray[0]) } });
    // res.status(200).send(courses);
    const c = await Course.aggregate([
      {
        $match: {
          subject: { $in: subjectArray },
        },
      },

      {
        $match: {
          rating: { $lte: parseInt(ratingArray[1]) },
        },
      },
      {
        $match: {
          rating: { $gte: parseInt(ratingArray[0]) },
        },
      },
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
      {
        $match: {
          discountedPrice: { $lte: parseInt(priceArray[1]) },
        },
      },
      {
        $match: {
          discountedPrice: { $gte: parseInt(priceArray[0]) },
        },
      },
    ]);
    if (!c) return res.status(200).send({ message: "No course found" });
    res.status(200).send(c);
  } catch (err) {
    res.status(401).send(err);
  }
};

export const getCourseData = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await Course.findById(id);
    res.status(200).send(courses);
  } catch (error) {
    console.log(error);
  }
};
//add rating for course by trainee
export const addRating = async (req, res) => {
  const { courseId, corporateTraineeId, individualTraineeId, rating } =
    req.query;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send({ message: "Course not found" });
    //check if the trainee is individual or corporate
    if (individualTraineeId !== "") {
      const trainee = await IndividualTrainee.findById(individualTraineeId);
      if (!trainee)
        return res.status(404).send({ message: "Trainee not found" });
      //check if the trainee has already rated the course then update the rating
      const index = course.ratings.findIndex(
        (rating) => rating.individualTraineeId == individualTraineeId
      );
      if (index !== -1) {
        course.ratings[index].rating = rating;
        const newRating =
          course.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
          course.ratings.length;
        course.rating = newRating;
        await course.save();
        return res.status(200).json(course);
      }
      //if the trainee has not rated the course then add the rating and set corporateTraineeId to null
      course.ratings.push({
        individualTraineeId,
        rating,
        corporateTraineeId: null,
      });
      const newRating =
        course.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
        course.ratings.length;
      course.rating = newRating;
      await course.save();
      return res.status(200).json(course);
    }
    if (corporateTraineeId !== "") {
      const trainee = await CorporateTrainee.findById(corporateTraineeId);
      if (!trainee)
        return res.status(404).send({ message: "Trainee not found" });
      //check if the trainee has already rated the course then update the rating
      const index = course.ratings.findIndex(
        (rating) => rating.corporateTraineeId == corporateTraineeId
      );
      if (index !== -1) {
        course.ratings[index].rating = rating;
        //calculate new rating as average of ratings array and update the course rating
        const newRating =
          course.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
          course.ratings.length;
        course.rating = newRating;
        await course.save();
        return res.status(200).json(course);
      }
      //if the trainee has not rated the course then add the rating and set individualTraineeId to null

      course.ratings.push({
        corporateTraineeId,
        rating,
        individualTraineeId: null,
      });
      //calculate new rating as average of ratings array and update the course rating
      const newRating =
        course.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
        course.ratings.length;
      course.rating = newRating;

      await course.save();
      return res.status(200).json(course);
    }
  } catch (error) {
    console.log(error);
  }
};

// add review for course by trainee
export const addReview = async (req, res) => {
  const { courseId, corporateTraineeId, individualTraineeId, review } =
    req.query;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send({ message: "Course not found" });
    //check if the trainee is individual or corporate
    if (individualTraineeId !== "") {
      const trainee = await IndividualTrainee.findById(individualTraineeId);
      if (!trainee)
        return res.status(404).send({ message: "Trainee not found" });
      //check if the trainee has already reviewed the course then update the review
      const index = course.reviews.findIndex(
        (review) => review.individualTraineeId == individualTraineeId
      );
      if (index !== -1) {
        course.reviews[index].review = review;
        await course.save();
        return res.status(200).json(course);
      }
      //if the trainee has not reviewed the course then add the review and set corporateTraineeId to null
      course.reviews.push({
        individualTraineeId,
        review,
        corporateTraineeId: null,
      });
      await course.save();
      return res.status(200).json(course);
    }
    if (corporateTraineeId !== "") {
      const trainee = await CorporateTrainee.findById(corporateTraineeId);
      if (!trainee)
        return res.status(404).send({ message: "Trainee not found" });
      //check if the trainee has already reviewed the course then update the review
      const index = course.reviews.findIndex(
        (review) => review.corporateTraineeId == corporateTraineeId
      );
      if (index !== -1) {
        course.reviews[index].review = review;
        await course.save();
        return res.status(200).json(course);
      }
      //if the trainee has not reviewed the course then add the review and set individualTraineeId to null
      course.reviews.push({
        corporateTraineeId,
        review,
        individualTraineeId: null,
      });
      await course.save();
      return res.status(200).json(course);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCoursesWithPromotion = async (req, res) => {
  try {
    const courses = await Course.aggregate([
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
    if (!courses) return res.status(404).send({ message: "Courses not found" });
    res.status(200).send(courses);
  } catch (error) {
    console.log(error);
  }
};
export const getUserNames = async (req, res) => {
  const { courseId } = req.query;
  //I want to get all userNames of people that has reviews or rating and return this array
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send({ message: "Course not found" });
    const reviews = course.reviews;
    const ratings = course.ratings;
    const allReviews = [...reviews, ...ratings];
    const userNames = [];
    for (let i = 0; i < allReviews.length; i++) {
      if (allReviews[i].individualTraineeId) {
        const trainee = await IndividualTrainee.findById(
          allReviews[i].individualTraineeId
        );
        if (userNames.includes(`${trainee.firstName} ${trainee.lastName}`))
          continue;
        userNames.push(`${trainee.firstName} ${trainee.lastName}`);
      }
      if (allReviews[i].corporateTraineeId) {
        const trainee = await CorporateTrainee.findById(
          allReviews[i].corporateTraineeId
        );
        //Before adding check if it has the same firstName and lastName
        if (userNames.includes(`${trainee.firstName} ${trainee.lastName}`))
          continue;
        userNames.push(`${trainee.firstName} ${trainee.lastName}`);
      }
    }
    res.status(200).send(userNames);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const requestRefund = async (req, res) => {
  const {
    course,
    type,
    individualTraineeId,
    coorporateTraineeId,
    firstName,
    lastName,
    email,
    refundReason,
    refundType,
  } = req.body;
  console.log(req.body);
  try {
    const refund = new Refund({
      individualTraineeId,
      coorporateTraineeId,
      courseId: course._id,
      courseName: course.title,
      refundReason: refundReason,
      refundDate: new Date(Date.now()),
      firstName,
      lastName,
      email,
      refundReason,
      refundType,
      instructorId: course.instructor.instructorId,
    });
    console.log("refund", refund);
    await refund.save();
    console.log("iam here");
    res.status(200).send(refund);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const sendCertificatePdf = async (req, res) => {
  console.log("ia mhere mannnn");
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      secure: false,
      service: "gmail", // true for 465, false for other ports
      auth: {
        user: "robyamama55@gmail.com", // generated ethereal user
        pass: "mjuzqpeqivvllzoz", // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    //create html for password reset
    let html = `<div>
    <h1>SUII Password</h1>
    <p>Download Certificalte</p>
   
    </div>`;
    console.log(req.body);
    // send mail with defined transport object

    let info = await transporter.sendMail({
      from: "robyamama55@gmail.com", // sender address
      to: "roberto.josephselim@gmail.com", // list of receivers
      subject: "SUIII Password", // Subject line
      text: "Hello world?", // plain text body
      html: html, // html body
      attachments: [
        {
          filename: "report.pdf",
          path: "../report.pdf",
          contentType: "application/pdf",
        },
      ],
    });
    console.log("INFO ", info);
    res
      .status(200)
      .send(`Click on the link sent to ${email} to reset password`);
  } catch {
    res.status(400).send("Error sending email");
  }
};

export const getPopularCourses = async (req, res) => {
  try {
    //I want to get from databse and sort according to numberOfTraineesEnrolled field descendingly and return the first 3 courses
    // const courses = await Course.find()
    //   .sort({ numberOfTraineesEnrolled: -1 })
    //   .limit(12);
    const courses = await Course.aggregate([
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
    ])
      .sort({ numberOfTraineesEnrolled: -1 })
      .limit(12);
    if (!courses) return res.status(404).send({ message: "Courses not found" });
    res.status(200).send(courses);
  } catch (error) {
    console.log(error);
  }
};
