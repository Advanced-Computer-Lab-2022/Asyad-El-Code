import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {},
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
