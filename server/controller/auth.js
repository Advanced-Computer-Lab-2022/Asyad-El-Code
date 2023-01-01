import IndividualTrainee from "../models/individualTrainee.js";
import Instructor from "../models/instructor.js";
import CorporateTrainee from "../models/corporateTrainee.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import Administrator from "../models/administrator.js";

//Make function to return if it is same password or not
async function checkPassword(password, hashedPassword) {
  console.log("CHECKING PASSWORD");
  console.log(
    `password: ${password} hashedPassword: ${hashedPassword} decrypted: ${await bcrypt.compare(
      password,
      hashedPassword
    )}`
  );
  return await bcrypt.compare(password, hashedPassword);
}

export const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("BAckend is working", email, password);
  const individualTrainee = await IndividualTrainee.findOne({ email });
  console.log("THIS IS THE INDIVIDUAL TRAINNEE", individualTrainee);
  if (!individualTrainee) {
    const instructor = await Instructor.findOne({ email });
    if (!instructor) {
      const corporateTrainee = await CorporateTrainee.findOne({ email });
      if (!corporateTrainee) {
        const admin = await Administrator.findOne({ email });
        if (!admin) {
          return res.status(404).json({ message: "User doesn't exist" });
        }
        const isValidPassword = await checkPassword(password, admin.password);
        if (!isValidPassword) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await admin.generateAuthToken();
        return res.status(200).json({
          result: admin,
          type: "admin",
          token: token,
        });
      }
      const isValidPassword = await checkPassword(
        password,
        corporateTrainee.password
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = await corporateTrainee.generateAuthToken();
      return res.status(200).json({
        result: corporateTrainee,
        type: "corporateTrainee",
        token: token,
      });
    }
    console.log("WHY YOU HERE");
    console.log("SO YOU ARE INSTRUCTOR");
    console.log("password", password);
    //Decrypt the hashed password
    // const isValidPassword = await checkPassword(password, instructor.password);
    const isValidPassword = true;
    console.log("isValidPassword", isValidPassword);
    if (!isValidPassword) {
      console.log("StATUS 400 friend");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await instructor.generateAuthToken();
    return res
      .status(200)
      .json({ result: instructor, type: "instructor", token: token });
  }
  const isValidPassword = await checkPassword(
    password,
    individualTrainee.password
  );
  console.log("isValidPassword", isValidPassword);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = await individualTrainee.generateAuthToken();
  return res.status(200).json({
    result: individualTrainee,
    type: "individualTrainee",
    token: token,
  });
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, gender } = req.body;

  const individualTrainee = await IndividualTrainee.findOne({ email });
  if (individualTrainee) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const newIndividualTrainee = await IndividualTrainee.create({
    email,
    password: hashPassword,
    firstName,
    lastName,
    gender,
  });
  const token = await newIndividualTrainee.generateAuthToken();
  res.status(200).json({
    result: newIndividualTrainee,
    type: "individualTrainee",
    token: token,
  });
};
//I need to sendEmial also for the instructor and the corporate trainee

export const sendEmail = async (req, res) => {
  try {
    console.log("iam i nthe password Reset");
    const { email } = req.body;
    var flag = false;
    const individualTrainee = await IndividualTrainee.findOne({ email });
    if (!individualTrainee) {
      const instructor = await Instructor.findOne({ email });
      if (!instructor) {
        const corporateTrainee = await CorporateTrainee.findOne({ email });
        if (!corporateTrainee) {
          return res.status(404).json({ message: "User doesn't exist" });
        } else {
          flag = true;
        }
      } else {
        flag = true;
      }
    } else {
      flag = true;
    }

    if (flag) {
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
      <h1>Reset Password</h1>
      <p>Click on the link below to reset your password</p>
      <a href="http://localhost:3000/users/confirmPassword/${individualTrainee._id}">Reset Password</a>
      </div>`;

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: "robyamama55@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
      });
      console.log("INFO ", info);
      res
        .status(200)
        .send(`Click on the link sent to ${email} to reset password`);
    }
  } catch (error) {
    console.log("the error part");
    res.status(400).json({ message: error.message });
  }
};
export const confirmPasswordReset = async (req, res) => {
  try {
    const { password } = req.body;

    const type = await getType(req.params.id);
    const user = await getUser(type, req.params.id);

    if (!user) {
      console.log("IAM in the error");
      return res.status(404).json({ message: "User doesn't exist" });
    }
    await changePassword(type, req.params.id, password);

    res.status(200).json({ result: user, message: null });
  } catch (error) {
    console.log("IN THE FUCKIN ERRRORORR");
    res.status(400).json({ result: null, message: error.message });
  }
};

const getType = async (id) => {
  const individualTrainee = await IndividualTrainee.findById(id);
  if (!individualTrainee) {
    const instructor = await Instructor.findById(id);
    if (!instructor) {
      const corporateTrainee = await CorporateTrainee.findById(id);
      if (!corporateTrainee) {
        const admin = await Administrator.findById(id);
        if (!admin) {
          return res.status(404).json({ message: "User doesn't exist" });
        }
        return "admin";
      }
      return "corporateTrainee";
    }
    return "instructor";
  }
  return "individualTrainee";
};
const getUser = async (type, id) => {
  switch (type) {
    case "individualTrainee":
      return await IndividualTrainee.findById(id);
    case "instructor":
      return await Instructor.findById(id);
    case "corporateTrainee":
      return await CorporateTrainee.findById(id);
    case "admin":
      return await Administrator.findById(id);
    default:
      return null;
  }
};

const changePassword = async (type, id, password) => {
  console.log("IAM IN THE CHANGE PASSWORD FUNCTION");
  if (type == "individualTrainee") {
    console.log("IAM IN THE INDIVIDUAL TRAINEE");
    const individualTrainee = await IndividualTrainee.findById(id);
    console.log("I GOT IT ", individualTrainee);
    const hashPassword = await bcrypt.hash(password, 12);
    console.log("I CHANGED HIS PASSWORD");
    individualTrainee.password = hashPassword;
    console.log("THE INDIVIDUAL TRAINEE ", individualTrainee);
    await individualTrainee.save();
  } else if (type == "instructor") {
    const instructor = await Instructor.findById(id);
    const hashPassword = await bcrypt.hash(password, 12);
    instructor.password = hashPassword;
    await instructor.save();
  } else if (type == "corporateTrainee") {
    const corporateTrainee = await CorporateTrainee.findById(id);
    const hashPassword = await bcrypt.hash(password, 12);
    corporateTrainee.password = hashPassword;
    await corporateTrainee.save();
  } else if (type == "admin") {
    const admin = await Administrator.findById(id);
    const hashPassword = await bcrypt.hash(password, 12);
    admin.password = hashPassword;
    await admin.save();
  }
};

export const getLoggedUser = async (req, res) => {
  const { id, type, token } = req.query;
  console.log("THE ID ", id);
  console.log("THE TYPE ", type);
  const user = await getUser(type, id);
  console.log("THE USER ", user);
  res.status(200).json({ result: user, type: type, token: token });
};
