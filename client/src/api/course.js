import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/course" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchCourses = async () =>
  await API.get(`/getCoursesWithPromotion`);
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
export const getUserNames = async (courseId) =>
  await API.get(`/getUserNames?courseId=${courseId}`);

export const requestRefund = async (dataObject) => {
  return await API.post("/requestRefund", dataObject);
};

export const sendCertificatePdf = async () => {
  return await API.post("/sendCertificatePdf");
};
