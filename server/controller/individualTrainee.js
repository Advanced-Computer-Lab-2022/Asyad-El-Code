import mongoose from "mongoose";
import IndividualTrainee, { validate } from "../models/individualTrainee.js";
import Course from "../models/course.js";

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
    const individualtrainee = await new IndividualTrainee({
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
    console.log(error.message);
    res.send(error.message);
  }
};

export const getAllIndividualTrainees = async (req, res) => {
  const indvidTrainees = await IndividualTrainee.find();
  res.send(indvidTrainees);
};

//findbyid or just find?
export const getIndividualTrainees = async (req, res) => {
  try {
    const { id } = req.params;
    const indvidTrainee = await IndividualTrainee.findById(id);
    if (!indvidTrainee) return res.status(404).send("This id doesnt exist");
    res.send(indvidTrainee);
  } catch (error) {
    res.send(error.message + "id is not valid");
  }
};

export const deleteIndividualTrainee = async (req, res) => {
  try {
    const deletedIndvidTrainee = await IndividualTrainee.findById(
      req.params.id
    );
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
    const id = req.params.id;
    const castedId = mongoose.Types.ObjectId(id);
    const IndvidTrainee = await IndividualTrainee.findById(castedId);
    if (!IndvidTrainee) return res.status(404).send("This id doesnt exist");
    const newIndvidualTrainee = await IndividualTrainee.findByIdAndUpdate(
      castedId,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
      },
      { new: true }
    );
    res.status(200).send(newIndvidualTrainee);
  } catch (error) {
    res.status(401).json({ error: err.message });
  }
};

export const selectCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = req.body.country;
    const updated = await IndividualTrainee.findByIdAndUpdate(
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
export const enrollCourse = async (req, res) => {
  try {
    const { id, courseId } = req.body;
    const courseIdCasted = await mongoose.Types.ObjectId(courseId);
    const idCasted = await mongoose.Types.ObjectId(id);
    console.log(id);
    console.log(idCasted);
    console.log(courseIdCasted);
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
    const user = await IndividualTrainee.findById(idCasted);
    const updatedUser = await IndividualTrainee.findByIdAndUpdate(
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
    if (!updatedUser) {
      res.status(401).send("Couldn't enroll course");
    } else res.status(200).send(updatedUser);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const addGrade = async (req, res) => {
  try {
    const { individualTraineeId, courseId, outlineId, score, total } =
      req.query;
    console.log("Sabaaaahooo");
    console.log("This is the outlineId from frontend ", outlineId);
    const castedOutlineId = await mongoose.Types.ObjectId(outlineId);
    console.log("Casted id ", castedOutlineId);
    const user = await IndividualTrainee.findById(individualTraineeId);

    const course = user.courses.find((course) => course._id == courseId);

    const grade = course.grades.find((grade) => grade._id == outlineId);
    if (grade) {
      grade.score = score;
      grade.total = total;
    } else {
      course.grades.push({ score, total, _id: castedOutlineId });
    }

    console.log("USER COURSES ", user.courses);
    const updatedUser = await IndividualTrainee.findByIdAndUpdate(
      individualTraineeId,
      { courses: user.courses },
      { new: true }
    );
    console.log("This is updated user", updatedUser);
    if (!updatedUser) {
      console.log("Couldnt finddd");
      res.status(401).send("Couldn't add grade");
    } else res.status(200).send(updatedUser);
  } catch (error) {
    console.log("Im in the errorrrr");
    res.status(401).json({ error: error.message });
  }
};

export const addSeenContent = async (req, res) => {
  try {
    const { individualTraineeId, courseId, outlineId } = req.query;
    const user = await IndividualTrainee.findById(individualTraineeId);
    const course = user.courses.find((course) => course._id == courseId);
    const test = true;
    course.seenContent.push({ test, _id: outlineId });
    const updatedUser = await IndividualTrainee.findByIdAndUpdate(
      individualTraineeId,
      { courses: user.courses },
      { new: true }
    );
    if (!updatedUser) {
      res.status(401).send("Couldn't add seen content");
    } else res.status(200).send(updatedUser);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
