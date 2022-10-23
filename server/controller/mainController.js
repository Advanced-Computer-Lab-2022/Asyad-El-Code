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

//guest/instructor/individual trainee 
export const getCourseInformation = async (req, res) => {
    try {
        const id = req.params.id;
        const courses = await Course.findById(id).select({ subTitles: 1, exercises:1, duration:1, price:1, discount:1 })
        res.status(200).send(courses);

    } catch (err) {
        res.status(401).send(err)
    }
};

