import mongoose from "mongoose";
import IndividualTrainee, { validate } from "../models/individualTrainee.js";
import Course from "../models/course.js";
import pdf from "html-pdf";
import Stripe from "stripe";
import "dotenv/config";
import Instructor from "../models/instructor.js";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

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
    const individualtrainee = new IndividualTrainee({
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
    console.log("id is ", id);
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
    console.log("IAM HERE SO ");
    const id = req.params.id;
    const castedId = mongoose.Types.ObjectId(id);
    const IndvidTrainee = await IndividualTrainee.findById(castedId);
    if (!IndvidTrainee) return res.status(404).send("This id doesnt exist");
    const newIndvidualTrainee = await IndividualTrainee.findByIdAndUpdate(
      castedId,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
    const { id, courseId } = req.query;
    const courseIdCasted = await mongoose.Types.ObjectId(courseId);
    const idCasted = await mongoose.Types.ObjectId(id);
    console.log("Im in enroll course methoddd");
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
    //increase numberOfTraineesEnrolled field of the course by 1
    console.log("Just before updating course");
    const updatedCourse = await Course.findByIdAndUpdate(
      courseIdCasted,
      { $inc: { numberOfTraineesEnrolled: 1 } },
      { new: true }
    );
    console.log("This is updated course", updatedCourse);
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
    const { individualTraineeId, courseId, outlineId, minutes } = req.query;
    const user = await IndividualTrainee.findById(individualTraineeId);
    const course = user.courses.find((course) => course._id == courseId);
    //check if already exists
    const seenContent = course.seenContent.find(
      (seenContent) => seenContent._id == outlineId
    );
    if (!seenContent) {
      course.seenContent.push({ duration: minutes, _id: outlineId });
      const updatedUser = await IndividualTrainee.findByIdAndUpdate(
        individualTraineeId,
        { courses: user.courses },
        { new: true }
      );
      if (!updatedUser) {
        res.status(401).send("Couldn't add seen content");
      } else res.status(200).send(updatedUser);
    } else {
      res.status(200).send("Already exists");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const addNote = async (req, res) => {
  try {
    console.log("Iam adding note");
    const { individualTraineeId, courseId, lectureId, note, playedMinutes } =
      req.query;
    const user = await IndividualTrainee.findById(individualTraineeId);
    const course = user.courses.find((course) => course._id == courseId);
    const notes = course.notes.find((note) => note.subtitleId == lectureId);
    if (notes) {
      notes.note.push({ value: note, time: playedMinutes });
    } else {
      course.notes.push({
        note: [{ value: note, time: playedMinutes }],
        subtitleId: lectureId,
      });
    }
    const updatedUser = await IndividualTrainee.findByIdAndUpdate(
      individualTraineeId,
      { courses: user.courses },
      { new: true }
    );
    if (!updatedUser) {
      res.status(401).send("Couldn't add note");
    } else res.status(200).send(updatedUser);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const createPdf = (notes) => {
  try {
    console.log("THE NOTES IN BACKED", notes);
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        </head>
        <body>
        <h1>Notes</h1>
        <ul>
        ${notes.map((note) => {
          return `<li>${note.value + " " + note.time}</li>`;
        })}
        </ul>
        </body>
        </html>
    `;
  } catch (error) {
    console.log(error);
  }
};

export const getNotes = async (req, res) => {
  // console.log("getNotes fucntion here");
  console.log("PLEASE");
  try {
    console.log("IAM IN THE BACK OF GETNOTES");
    const { userId, courseId, lectureId } = req.query;
    console.log(req.query);
    const user = await IndividualTrainee.findById(userId);
    console.log("USER IN BACKEND ", user);
    console.log(user);

    const course = user.courses.find((course) => course._id == courseId);
    console.log("COURSE IN BACKEND ", course);
    const notes = course.notes.find((note) => note.subtitleId == lectureId);

    if (!notes) {
      res.status(401).send("Couldn't find notes");
    }
    res.status(200).send(notes);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const payCourse = async (req, res) => {
  try {
    const courses = [req.body.course];
    console.log("COURSES", courses);

    const instructorPrecentage = 0.86;
    const instructorProfit = parseInt(courses[0].price) * instructorPrecentage;
    const stripeProfit = parseInt(courses[0].price) - instructorProfit;
    const instructorId = req.body.instructorId;
    console.log("INSTRUCTOR ID", instructorId);

    const instructor = await Instructor.findById(instructorId);
    instructor.wallet = instructor.wallet + instructorProfit;
    await instructor.save();
    console.log("INSTRUCTOR WALLET", instructor.wallet);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:3000/success/${courses[0]._id}`,
      cancel_url: "http://localhost:3000/cancel",
      line_items: courses.map((course) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              description: course.sumary,

              name: course.title,
            },

            unit_amount: course.price * 100,
          },
          quantity: courses.length,
        };
      }),

      custom_text: {
        submit: {
          message: "Pay Now",
        },
      },
    });

    res.send({ url: session.url });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Refunding the course if the progress of course is lessThan 50%
