import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProblems } from "../../actions/reportedProblems";
import ReportedProblems from "./ReportedProblems";

const Problems = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reportedProblems);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    if (flag) {
      dispatch(getAllProblems());
      setFlag(false);
    }
  }, []);
  console.log("THIS IS THE STATE", state);

  return (
    <div>
      {state?.problems?.length > 0 ? (
        <ReportedProblems reportedProblems={state.problems}></ReportedProblems>
      ) : null}
    </div>
  );
};

export default Problems;
