import {
  CREATE_COURSE,
  FETCH_ALL,
  GET_COURSE_DATA,
  FILTER_COURSES,
  GET_COURSE,
  ADD_RATING,
  ADD_REVIEW,
  START_LOADING,
  END_LOADING,
  FILTER_SUBJECT_RATING,
  FETCH_ALL_INSTRUCTOR_COURSES,
  FILTER_INSTRUCTOR_COURSES,
  FETCH_POPULAR_COURSES,
} from "../constants/courses";

export default (state = { isLoading: true, courses: [] }, action) => {
  console.log("Iam here");
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case FILTER_COURSES:
      return { ...state, courses: action.payload };

    case FETCH_ALL:
    case FETCH_POPULAR_COURSES:
      return { ...state, courses: action.payload };

    case FILTER_SUBJECT_RATING:
    case FETCH_ALL_INSTRUCTOR_COURSES:
    case FILTER_INSTRUCTOR_COURSES:
      return { ...state, courses: action.payload };

    case CREATE_COURSE:
      return { ...state, courses: [...state.courses, action.payload] };
    case GET_COURSE_DATA:
    case GET_COURSE:
    case ADD_RATING:
    case ADD_REVIEW:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id === action.payload._id
        ),
      };

    default:
      return state;
  }
};
