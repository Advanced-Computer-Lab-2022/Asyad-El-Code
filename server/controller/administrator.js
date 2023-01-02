import Administrator from "../models/administrator.js";
import { validate } from "../models/administrator.js";
import CorporateTrainee from "../models/corporateTrainee.js";
import Instructor from "../models/instructor.js";
import bcrypt from "bcryptjs";
import CourseRequests from "../models/courseRequests.js";
import nodemailer from "nodemailer";
import Course from "../models/course.js";
import mongoose from "mongoose";
import {Refund} from "../models/refund.js";
import IndividualTrainee from "../models/individualTrainee.js";


// export const createAdministrator = async (req, res) => {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const {
//         userName,
//         lastName,
//         email,
//         password,
//         userName,
//     } = req.body;

//     try {
//         const administrator = new Administrator({
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             password: password,
//             userName: userName
//         });

//         await administrator.save();
//         res.status(200).json(administrator)
//     } catch (err) {
//         res.send(err.message)
//     }

// }

// get all Refunds
export const getRefunds = async (_req, res) => {
  console.log("Getting all refunds");
  try {
    const refunds = await Refund.find();
    res.status(200).send(refunds);
  } catch (err) {
    res.send(err.message);
  }
};

// refund a course
export const refundCourse = async (req, res) => {
  const { individualTraineeId, courseId, instructorId } = req.body;
  const courseCastedId = mongoose.Types.ObjectId(courseId);
  const individualTraineeCastedId = mongoose.Types.ObjectId(individualTraineeId);
  const instructorCastedId = mongoose.Types.ObjectId(instructorId);
  try {
    const course = await Course.findById(courseCastedId);
    const individualTrainee = await IndividualTrainee.findById(
      individualTraineeCastedId
    );
    const instructor = await Instructor.findById(instructorCastedId);
    // update the individual trainee wallet balance
    const newBalance =
      individualTrainee.wallet + course.price;
    await IndividualTrainee.findByIdAndUpdate(individualTraineeCastedId, {
      wallet: newBalance,
    });
    // update the instructor wallet balance
    const newInstructorBalance =
      instructor.wallet - course.price * 0.86;
    await Instructor.findByIdAndUpdate(instructorCastedId, {
      wallet: newInstructorBalance,
    });
    res.status(200).send("Refund successful");
  } catch (err) {
    res.send(err.message);
  }
};

export const createAdministrator = async (req, res) => {
  const { userName, password, email } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);

    const administrator = await new Administrator({
      password: hashPassword,
      email,
    });
    await administrator.save();
    console.log(administrator);
    res.status(200).send(administrator);
  } catch (error) {
    res.status(401).send(error.message);
  }
};



export const getAdministrators = async (_req, res) => {
  console.log("I am in the admin controller");
  try {
    const administrators = await Administrator.find();
    res.status(200).send(administrators);
  } catch (err) {
    res.send(err.message);
  }
};

export const getCourseRequests = async (_req, res) => {
  console.log("Getting all course requests");
  try {
    const requests = await CourseRequests.find();
    res.status(200).send(requests);
  } catch (err) {
    res.send(err.message);
  }
};

export const getAdministratorById = async (req, res) => {
  try {
    const id = req.params.id;
    const administrator = await Administrator.findById(id);
    if (!administrator) res.status(200).send(administrator);
    else res.status(400).send(`Could not find Administrator with id: ${id}`);
  } catch (err) {
    res.send(err.message);
  }
};

export const getAdministratorByUserName = async (req, res) => {
  try {
    const userName = req.params.userName;
    const administrator = await Administrator.find({ userName: userName });
    res.status(200).send(administrator);
  } catch (err) {
    res.send(err.message);
  }
};

export const deleteAdministrator = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAdministrator = await Administrator.findByIdAndDelete(id);
    if (!deletedAdministrator) {
      res.status(400).send("Couldn't delete administrator");
    } else {
      res.status(200).send(deletedAdministrator);
    }
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

export const updateAdministrator = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAdministrator = await Administrator.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updateAdministrator) {
      res.status(400).send("Couldn't update administrator");
    } else {
      res.status(200).send(updatedAdministrator);
    }
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// Admin create instructors with username and password

//TODO HEIDAR
//ADD EMAIL TO HIS BODY
export const addInstructor = async (req, res) => {
  const { userName, password,email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const instructor = new Instructor({
      userName: userName,
      password: hashedPassword,
      email:email
    });
    await instructor.save();
    res.status(200).json(instructor);
  } catch (error) {
    res.send(error.message);
  }
};
export const addCorporateTrainee = async (req, res) => {
  const { userName, password, email, company } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const corporateTrainee = new CorporateTrainee({
      userName: userName,
      password: hashedPassword,
      email:email,
      company: company
    });
    await corporateTrainee.save();
    res.status(200).json(corporateTrainee);
  } catch (error) {
    res.send(error.message);
  }


};

export const provideCourse = async (req, res) => {
  try {
    const { id, courseId } = req.query;
    console.log("COURSE ID: ", courseId);
    console.log("ID: ", id);
    const courseIdCasted = await mongoose.Types.ObjectId(courseId);
    const idCasted = await mongoose.Types.ObjectId(id);
    const {
      _id,
      title,
      summary,
      duration,
      releaseDate,
      image,
      rating,
      instuctor,
    } = await Course.findById(courseIdCasted);
    const user = await CorporateTrainee.findById(idCasted);
    const updatedUser = await CorporateTrainee.findByIdAndUpdate(
      idCasted,
      {
        courses: [
          ...user.courses,
          {
            _id: _id,
            title,
            summary,
            duration,
            releaseDate,
            image,
            rating,
            instuctor,
          },
        ],
      },
      { new: true }
    );
    //increase numberOfTraineesEnrolled field of the course by 1
    const updatedCourse = await Course.findByIdAndUpdate(
      courseIdCasted,
      { $inc: { numberOfTraineesEnrolled: 1 } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(401).send("Couldn't enroll course");
    } else res.status(200).send(updatedUser);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const acceptCourseRequest = async (req, res) => {
  try {
    console.log("Sending email to confirm course request");
    const { email, courseName } = req.body;
    const corperateTrainee = await CorporateTrainee.findOne({ email });
    if (!corperateTrainee) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
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
      <h1>Course Request</h1>
      <p>Dear ${corperateTrainee.userName},<br>
      Your request to access ${courseName} has been accepted. <br>
      You can now login to your account to view the course details.</p>
      </p>
      </div>`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "robyamama55@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Course Request", // Subject line
      text: "Hello world?", // plain text body
      html: html, // html body
    });
    console.log("INFO ", info);
    res
      .status(200)
      .send(
        `Course request has been accepted and email has been sent to ${email}`
      );
  } catch (error) {
    console.log("the error part");
    res.status(400).json({ message: error.message });
  }
};

export const rejectCourseRequest = async (req, res) => {
  try {
    console.log("Sending email to reject course request");
    const { email, courseName } = req.body;
    const corperateTrainee = await CorporateTrainee.findOne({ email });
    if (!corperateTrainee) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
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
      <h1>Course Request</h1>
      <p>Dear ${corperateTrainee.userName},<br>
      Unfortunately, Your request to access ${courseName} has been rejected. <br>
      You can make use of the available courses at the meantime.</p>
      </p>
      </div>`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "robyamama55@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Course Request", // Subject line
      text: "Hello world?", // plain text body
      html: html, // html body
    });
    console.log("INFO ", info);
    res
      .status(200)
      .send(
        `Course request has been rejected and email has been sent to ${email}`
      );
  } catch (error) {
    console.log("the error part");
    res.status(400).json({ message: error.message });
  }
};

// delete a course request given the id
export const deleteCourseRequest = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedCourseRequest = await CourseRequests.findByIdAndDelete(id);
    if (!deletedCourseRequest) {
      res.status(400).send("Couldn't delete course request");
    } else {
      res.status(200).send(deletedCourseRequest);
    }
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

export const acceptRefund = async (req, res) => {
  try {
    console.log("Sending email to confirm course refund");
    const { email, courseName } = req.body;
    const individualTrainee = await IndividualTrainee.findOne({ email });
    if (!individualTrainee) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
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
      <h1>Refund Request</h1>
      <p>Dear ${individualTrainee.firstName},<br>
      Your refund request for the course ' ${courseName} ' has been accepted. <br>
      You can now login to your account to view your updated balance.</p>
      </p>
      </div>`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "robyamama55@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Refund Request", // Subject line
      text: "Hello world?", // plain text body
      html: html, // html body
    });
    console.log("INFO ", info);
    res
      .status(200)
      .send(
        `Refund request has been accepted and email has been sent to ${email}`
      );
  } catch (error) {
    console.log("the error part");
    res.status(400).json({ message: error.message });
  }
};

export const rejectRefund = async (req, res) => {
  try {
    console.log("Sending email to reject refund request");
    const { email, courseName } = req.body;
    const individualTrainee = await IndividualTrainee.findOne({ email });
    if (!individualTrainee) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
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
      <h1>Refund Request</h1>
      <p>Dear ${individualTrainee.firstName},<br>
      Unfortunately, Your request for a refund on the ' ${courseName} ' course has been rejected. <br>
      Please make sure you have not exceeded 50% in the course progress.</p>
      </p>
      </div>`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "robyamama55@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Refund Request", // Subject line
      text: "Hello world?", // plain text body
      html: html, // html body
    });
    console.log("INFO ", info);
    res
      .status(200)
      .send(
        `Refund request has been rejected and email has been sent to ${email}`
      );
  } catch (error) {
    console.log("the error part");
    res.status(400).json({ message: error.message });
  }
};

export const deleteRefundRequest = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedRefundRequest = await Refund.findByIdAndDelete(id);
    if (!deletedRefundRequest) {
      res.status(400).send("Couldn't delete refund request");
    } else {
      res.status(200).send(deletedRefundRequest);
    }
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};