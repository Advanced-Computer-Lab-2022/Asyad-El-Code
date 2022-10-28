import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    cardMedia: {
      objectFit: "cover",
      background: "black",
    },

    cardGrid: {
      padding: "10px",
    },
    cardContent: {
      marginTop: "0px",
      fontSize: "15px",
      fontWeight: "bold",
    },
    cardHeader: {
      fontWeight: "800",
      fontSize: "15px",
    },
  };
});
export default useStyles;
