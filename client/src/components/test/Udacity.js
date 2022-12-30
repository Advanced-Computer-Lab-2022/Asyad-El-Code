import React from "react";

export const Udacity = () => {
  return (
    <img
      style={{
        height: "150px",
        width: "150px",
        objectFit: "cover",
        //I want you to cut frrom the top right using ellipse and clippath
        //   clipPath: "ellipse(150% 80% at 0% 90%)",
        clipPath: "circle(100% at 100% 90%)",
      }}
      src={image}
    ></img>
  );
};
