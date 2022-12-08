import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/instructor" });

export const getAllInstructorCourses = async () =>
  await API.get(`/getAllInstructorCourses/635c587e07f18b986c357bb7`);

export const filterInstructorCourses = async (filterData) => {
  return await API.get(
    `/filterInstructorCourses/?id=635c587e07f18b986c357bb7&subject=${filterData.Subject}&price=${filterData.Price}&rating=${filterData.Rating}`
  );
};

export const fetchInstructors = async () => await API.get(`/`);

export const fetchInstructor = async () =>
  await API.get(`/635c587e07f18b986c357bb7`);

export const addInstructor = async (instructor) => {
  return await API.post(`/`, instructor);
};

// add Rating for course by trainee sending courseId corporate Trainee id and individual trainee id and rating
export const addRating = async (
  instructorId,
  corporateTraineeId,
  individualTraineeId,
  rating
) => {
  return await API.post(
    `/addRating?instructorId=${instructorId}&corporateTraineeId=${corporateTraineeId}&individualTraineeId=${individualTraineeId}&rating=${rating}`
  );
};

// add review for course by trainee sending courseId corporate Trainee id and individual trainee id and rating
export const addReview = async (
  instructorId,
  corporateTraineeId,
  individualTraineeId,
  review
) => {
  return await API.post(
    `/addReview?instructorId=${instructorId}&corporateTraineeId=${corporateTraineeId}&individualTraineeId=${individualTraineeId}&review=${review}`
  );
};
