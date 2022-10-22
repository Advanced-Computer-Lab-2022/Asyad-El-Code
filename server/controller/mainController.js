import e from "express";
import Course from "../models/course.js";

//guest/instructor/individual trainee/corporate trainee
export const getCoursesDetails = async (_req, res) => {
    try {
        const courses = await Course.find().select({ title: 1, duration: 1, rating: 1 })
        res.status(200).send(courses);
    } catch (err) {
        res.status(401).send(err)
    }
};

//guest/instructor/individual trainee
export const getPriceOfCourses = async (_req, res) => {
    try {
        const courses = await Course.find().select({ price: 1 })
        res.status(200).send(courses);

    } catch (err) {
        res.status(401).send(err)
    }
};