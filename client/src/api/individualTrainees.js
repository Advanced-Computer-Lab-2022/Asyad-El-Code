import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/individualTrainee",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchTrainee = async () =>
  await API.get(
    `/getTrainee/${JSON.parse(localStorage.getItem("profile")).result._id}`
  );

export const updateTrainee = async (id, trainee) =>
  await API.put(`/${id}`, trainee);

export const addGrade = async (
  individualTraineeId,
  courseId,
  outlineId,
  score,
  total
) =>
  await API.post(
    `/addGrade?individualTraineeId=${individualTraineeId}&courseId=${courseId}&outlineId=${outlineId}&score=${score}&total=${total}`
  );
export const getTrainee = async (id) => {
  const { data } = await API.get(`/getTrainee/${id}`);
  return data;
};

export const addSeenContent = async (
  individualTraineeId,
  courseId,
  outlineId,
  minutes
) =>
  await API.post(
    `/addSeenContent?individualTraineeId=${individualTraineeId}&courseId=${courseId}&outlineId=${outlineId}&minutes=${minutes}`
  );

export const addNote = async (
  individualTraineeId,
  courseId,
  lectureId,
  note,
  playedMinutes
) =>
  await API.post(
    `/addNote?individualTraineeId=${individualTraineeId}&courseId=${courseId}&lectureId=${lectureId}&note=${note}&playedMinutes=${playedMinutes}`
  );

export const getPdf = async (courseId, userId, lectureId) =>
  await API.get(`/getPdf`, { responseType: "blob" });

export const createPdf = async (notes) => await API.post(`/createPdf`, notes);

export const getNotes = async (userId, courseId, lectureId) =>
  await API.get(
    `/getNotes?courseId=${courseId}&userId=${userId}&lectureId=${lectureId}`
  );
// //TODO
// export const getAllNotes = async (lectureId, courseId) =>
//   await API.get(`/getAllNotes?lectureId=${lectureId}&courseId=${courseId}`);

export const enrollCourse = async (courseId, individualTraineeId) =>
  await API.post(
    `/enrollCourse?courseId=${courseId}&id=${individualTraineeId}`
  );

export const payCourse = async (courses) =>
  await API.post(`/payCourse`, courses);
