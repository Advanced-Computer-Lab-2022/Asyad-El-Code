import courses from "./courses";
import admins from "./admin";
import corporates from "./corporate";
import instructors from "./instructor";
import { combineReducers } from "redux";

export default combineReducers({ courses,admins,corporates,instructors});
