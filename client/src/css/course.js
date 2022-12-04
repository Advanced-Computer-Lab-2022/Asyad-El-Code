import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      marginTop: "18px",
      backgroundColor: "#1C1D1F",
      height: "390px",
    },
    courseTitle: {
      color: "white",
      fontWeight: "bold",
      fontSize: 40,
    },
    courseSubtitle: {
      color: "white",
      fontWeight: "830",
    },
    rating: {
      color: "#F2CA8C",
      borderColor: "#F2CA8C",
    },
    emptyStar: {
      color: "white",
    },
    coursePrice: {
      fontWeight: "bold",
      fontSize: 30,
    },
    earth: {
      color: "white",
      height: 20,
      width: 15,
    },
    buyNow: {
      borderStyle: "solid",
      borderRadius: 3,
      borderColor: "#D6CFD1",
      borderWidth: 1,
    },
    courseLearning: {
      width: 740,
      height: 200,
      borderStyle: "solid",
      borderWidth: 0.2,
      borderColor: "#D6CFD1",
      marginTop: 30,
    },
  };
});
export default useStyles;
