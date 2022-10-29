import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    appBar: {
      backgroundColor: "white",
    },
    logo: {
      height: "60px",
      width: "70px",
    },
    headerOptions: {
      flex: "1",
      display: "flex",
      justifyContent: "start",
    },
    navButtons: {
      backgroundColor: "white",
      color: "black",
    },
    rightSection: {
      display: "flex",
      justifyContent: "end",
    },
    courseButton: {
      width: "400px",
      color: "black",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "red",
      },
      fontWeight: "bold",
      marginLeft: "40px",
      marginRight: "40px",
    },
  };
});
export default useStyles;
