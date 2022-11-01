import './App.css';
import MyNavBar from './tempNavbar';
import Instructor from './instructor';
import AddCourseForm from './addCourse';
import CourseForm from './newCourse';

const App = () => {
  return (
    <>
      <MyNavBar></MyNavBar>
      <AddCourseForm></AddCourseForm>
      {/* <CourseForm></CourseForm> */}
    </>
  );
}

export default App;