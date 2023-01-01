import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/instructor" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getAllInstructorCourses = async (id) =>
  await API.get(`/getAllInstructorCourses/${id}`);

export const filterInstructorCourses = async (id, filterData) => {
  return await API.get(
    `/filterInstructorCourses/?id=${id}&subject=${filterData.Subject}&price=${filterData.Price}&rating=${filterData.Rating}`
  );
};

export const fetchInstructors = async () => await API.get(`/`);

export const fetchInstructor = async (id) => await API.get(`/${id}`);

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
export const updateInstructor = async (id, instructor) => {
  return await API.patch(`/updateInformation/${id}`, instructor);
};

export const addMoneyToInstructorWallet = async (courseId, instructorId) => {
  return await API.post(
    `/addMoneyToInstructorWallet?courseId=${courseId}&instructorId=${instructorId}`
  );
};
export const definePromotion = async (
  courseId,
  discount,
  startDate,
  endDate
) => {
  return await API.patch(
    `/definePromotion?courseId=${courseId}&discount=${discount}&startDate=${startDate}&endDate=${endDate}`
  );
};

// export const addMoneyToInstructorWallet = async (courseId, instructorId) => {
//   return await API.post(
//     `/addMoneyToInstructorWallet?courseId=${courseId}&instructorId=${instructorId}`
//   );
// };
