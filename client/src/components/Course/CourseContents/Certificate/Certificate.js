import React, { useState, useEffect } from "react";
import "./certificate.css";
import image from "../../../../images/can.jpeg";
import { jsPDF } from "jspdf";
import { Loading } from "./Loading";
import { sendCertificatePdf } from "../../../../api/course";
export const CE = ({ course }) => {
  const [isLoading, setisLoading] = useState(true);

  const generatePDF = async () => {
    const report = new jsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });
  };
  const user = JSON.parse(localStorage.getItem("profile"));

  const sendCertificate = async () => {
    const { data } = await sendCertificatePdf();
    console.log("DATA", data);
    console.log(data);
  };
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 6000);
    sendCertificate();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div id="report" class="certificate">
          <div class="header">Certificate of Completion</div>
          <div class="subheader">for successfully completing the course</div>
          <div class="recipient">
            {user?.result?.firstName + " " + user?.result?.lastName}
          </div>
          <div class="description">
            This certificate recognizes the completion of the course "
            {course.title}" by {course.instructor.name}{" "}
            {new Date(Date.now()).toDateString()}.
          </div>

          <div class="date">{new Date(Date.now()).toDateString()}</div>
          <div class="signature">Signed by John Doe</div>
          <button onClick={generatePDF}> Click Me</button>
        </div>
      )}
    </>
  );
};
