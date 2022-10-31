import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      marginTop: "30px",
      marginLeft: "100px",
    },
    image: {
      width: "500px",
      marginTop: "30px",
      marginLeft: "50px",
    },
    members: {
      marginTop: "40px",
    },
 
  };
});
export default useStyles;
