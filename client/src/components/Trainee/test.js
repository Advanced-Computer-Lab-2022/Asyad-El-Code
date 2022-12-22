import { Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const course = {
  _id: "1",
  name: "course1",
  description: "course1",
  price: 100,
  duration: 10,
};
export const Testo = () => {
  const history = useHistory();
  const checkOut = async () => {
    await axios
      .post("http://localhost:8000/individualTrainee/checkout", course)
      .then((res) => {
        console.log("RES", res);
        // history.push(`${res.data.url}`);

        window.location = res.data.url;
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  return <Button onClick={checkOut}>ChecKout</Button>;
};
export default Testo;
