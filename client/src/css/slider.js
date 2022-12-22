import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    cardMedia: {
      objectFit: "cover",
      background: "black",
    },

    cardGrid: {
      padding: "10px",
      borderRadius: "1",
      borderStyle: "solid",
      borderColor: "black",

      // paddingRight: "40px",
      height: 500,
    },
    cardContent: {
      marginTop: "0px",
      fontSize: "15px",
      fontWeight: "bold",
    },
    cardHeader: {
      // [theme.breakpoints.down("sm")]: {
      //   fontSize: 24,
      // },
      // [theme.breakpoints.up("lg")]: {
      //   fontSize: 20,
      // },

      fontWeight: "800",
      fontSize: "15px",
    },
    paper: {
      position: "absolute",
      left: "370px",
      top: "500px",
    },
  };
});
export default useStyles;
