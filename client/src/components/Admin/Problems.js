import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProblems } from "../../actions/reportedProblems";
import ReportedProblems from "./ReportedProblems";

const Problems = () => {
  const dispatch = useDispatch();
  const reportedProblems = useSelector(
    (state) => state?.reportedProblems?.problems
  );
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    if (flag) {
      dispatch(getAllProblems());
      setFlag(false);
    }
  }, []);

  return (
    <div>
      <ReportedProblems reportedProblems={reportedProblems}></ReportedProblems>
    </div>
  );
};

export default Problems;
