import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/course" });

export const fetchCourses = async () => await API.get(`/getCourses`);
export const filterCourses = async (filterData) =>
  await API.get(
    `/filterAllCourses/?subject=${filterData.Subject}&price=${filterData.Price}&rating=${filterData.Rating}`
  );
export const filterByTilteOrSubjectOrInstructor = async (searchQuery) =>
  await API.get(`/findCourse?searchQuery${searchQuery}`);

export const createCourse = async (course) => {
  return await API.post("/", course);
};
export const getCourseData = async () => {
  console.log("im in API");
  return await API.get(`/getCourseData/637fbdfb4578b11fccfd6f87`);
};

export const getCourse = async (courseId) =>
  await API.get(`/getCourse?courseId=${courseId}`);

// add Rating for course by trainee sending courseId corporate Trainee id and individual trainee id and rating
export const addRating = async (
  courseId,
  corporateTraineeId,
  individualTraineeId,
  rating
) => {
  return await API.post(
    `/addRating?courseId=${courseId}&corporateTraineeId=${corporateTraineeId}&individualTraineeId=${individualTraineeId}&rating=${rating}`
  );
};

// add review for course by trainee sending courseId corporate Trainee id and individual trainee id and rating
export const addReview = async (
  courseId,
  corporateTraineeId,
  individualTraineeId,
  review
) => {
  return await API.post(
    `/addReview?courseId=${courseId}&corporateTraineeId=${corporateTraineeId}&individualTraineeId=${individualTraineeId}&review=${review}`
  );
};
