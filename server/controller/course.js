import mongoose from "mongoose";
import Course from "../models/course.js";
import { validateCourse } from "../models/course.js";
import Instructor from "../models/instructor.js";
import IndividualTrainee from "../models/individualTrainee.js";
import CorporateTrainee from "../models/corporateTrainee.js";

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
    instructor,
    outlines,
    discount,
  } = req.body;

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
      outlines: outlines,
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

    const courses = await Course.find({
      subject: { $in: subjectArray },
    })
      .and({ price: { $lte: parseInt(priceArray[1]) } })
      .and({ price: { $gte: parseInt(priceArray[0]) } })
      .and({ rating: { $lte: parseInt(ratingArray[1]) } })
      .and({ rating: { $gte: parseInt(ratingArray[0]) } });
    res.status(200).send(courses);
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
        await course.save();
        return res.status(200).json(course);
      }
      //if the trainee has not rated the course then add the rating and set corporateTraineeId to null
      course.ratings.push({
        individualTraineeId,
        rating,
        corporateTraineeId: null,
      });
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
