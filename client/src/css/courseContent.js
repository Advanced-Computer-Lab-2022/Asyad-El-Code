import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      marginTop: "18px",
    },
    paper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#1C1D1F",
      marginBottom: "20px",
    },
    submit: {
      margin: "20px 0px 10px",
    },
    courseTitle: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
    },
    exercisePaper: {
      padding: "20px",
      backgroundColor: "#EBF1F2",
      marginBottom: "20px",
    },
    videoPaper: {
      backgroundColor: "#1C1D1F",
      color: "white",
      padding: "20px",
      marginBottom: "20px",
    },
  };
});
export default useStyles;
