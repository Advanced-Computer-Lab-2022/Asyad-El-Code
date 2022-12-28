import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enrollCourse } from "../../api/individualTrainees";

export const SuccessPage = () => {
  const [spinner, setSpinner] = useState(true);

  const { courseId } = useParams();
  useEffect(() => {
    enrollCourse(courseId, user?.result?._id);
  }, []);
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log("Iam the user", user);
  console.log("USER ID ", user?.result?._id);
  console.log("COURSE ID ", courseId);
  //change spinner when component did mount to false after a whilte
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, []);

  return (
    <div>
      {spinner ? (
        <div className="spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <h1>Success</h1>

          <h2>Thank you for your purchase</h2>
          <h3>Enjoy your course</h3>
        </div>
      )}
    </div>
  );
};
