import courses from "./courses";
import admins from "./admin";
import corporates from "./corporate";
import instructors from "./instructor";
import currencyRates from "./currencyRates";
import selectedCountry from "./selectedCountry";
import individualTrainee from "./individualTrainee";
import authReducer from "./auth";
import reportedProblems from "./reportedProblems";
import { combineReducers } from "redux";

export default combineReducers({
  courses,
  admins,
  corporates,
  instructors,
  currencyRates,
  selectedCountry,
  individualTrainee,
  authReducer,
  reportedProblems
});
