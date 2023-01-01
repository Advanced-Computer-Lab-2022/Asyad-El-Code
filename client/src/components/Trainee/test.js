import { Button } from "@mui/material";
import React from "react";
import axios from "axios";

const course = {
  _id: "1",
  name: "course1",
  description: "course1",
  price: 100,
  duration: 10,
};
export const Testo = () => {
  const checkOut = async () => {
    await axios
      .post("http://localhost:8000/individualTrainee/payCourse", course)
      .then((res) => {
        window.location = res.data.url;
      })
      .catch((err) => {});
  };

  return <Button onClick={checkOut}>ChecKout</Button>;
};
export default Testo;
