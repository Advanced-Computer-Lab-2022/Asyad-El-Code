import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AccordionSet from "./Accordion";
import Linear from "./LinearProgress.js";
import {
  DialogActions,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Grid,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RatingCourse from "./RatingCourse";
import { useDispatch, useSelector } from "react-redux";
import { addRating, addReview, getCourse } from "../../actions/courses";
import { useEffect } from "react";
import * as individualTraineeApi from "../../api/individualTrainees.js";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { VideoAndExercise } from "./VideoAndExercise";
import { CourseContentWelcomePage } from "./CourseContentWelcomePage";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const contentInitialForm = {
  subtitle: "",
  minutes: 0,
  videoUrl: "",
  _id: "",
};
const exerciseInitialForm = [
  { question: "", answers: [{ answer: "", correct: false }] },
];

export default function CourseContents() {
  function parseJson() {
    try {
      return JSON.parse(localStorage.getItem("profile"));
    } catch (ex) {
      return "";
    }
  }
  const user = parseJson();
  const [userObject, setUserObject] = useState({});

  const getIndividualTrainee = async () => {
    const data = await individualTraineeApi.getTrainee(user.result._id);
    setUserObject(data);
  };
  useEffect(() => {
    getIndividualTrainee();
  }, []);

  const { courses } = useSelector((state) => state.courses);
  const course = courses[0];

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);

  const [content, setContent] = useState(contentInitialForm);
  const [exercise, setExercise] = useState(exerciseInitialForm);
  const [exerciseId, setExerciseId] = useState("");
  const [showExerciseContent, setShowExerciseContent] = useState(false);
  const [showVideoContent, setShowVideoContent] = useState(false);
  const [solved, setSolved] = useState({});
  const [retakeOpen, setRetakeOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSubmitRatingAndReview = (rating, review) => {
    if (user.type === "individualTrainee") {
      dispatch(addRating(course?._id, "", user.result._id, rating));
      dispatch(addReview(course?._id, "", user.result._id, review));
    } else {
      dispatch(addRating(course?._id, user.result._id, "", rating));
      dispatch(addReview(course?._id, user.result._id, "", review));
    }

    setIsOpen(false);
  };
  const handleHome = () => {
    dispatch(getCourse(course._id, history, course?.title));
  };

  const handleVideoClick = (subtitle) => {
    const url = subtitle.videoUrl;
    const videoId = url.split("/").pop();
    const content = { ...subtitle, videoUrl: videoId, _id: subtitle._id };
    setContent(content);
    setExercise(exerciseInitialForm);
    setShowVideoContent(true);
    setShowExerciseContent(false);
  };
  const handleClickEx = (exercise, exerciseId) => {
    if (
      userObject?.courses
        .find((c) => c._id === course._id)
        ?.grades?.find((g) => g._id === exerciseId)
    ) {
      setSolved(true);
    }
    setExercise(exercise);
    setExerciseId(exerciseId);
    setContent(contentInitialForm);
    setShowVideoContent(false);
    setShowExerciseContent(true);
  };

  useEffect(() => {
    if (solved !== {} && solved === false) {
      setShowExerciseContent(true);
      setShowVideoContent(false);
    } else if (solved !== {} && solved === true) {
      setRetakeOpen(true);
    }
  }, [solved]);
  const handleRetake = async (exercise, exerciseId) => {
    setSolved(false);
    setRetakeOpen(false);
  };
  const handleCancelRetake = () => {
    setShowExerciseContent(false);
    setRetakeOpen(false);
    setSolved({});
  };

  useEffect(() => {
    calculateAndSetProgress();
  }, [userObject?.courses?.find((c) => c._id === course._id)?.seenContent]);

  const calculateAndSetProgress = () => {
    let totalDuration = 0;
    userObject?.courses
      ?.find((c) => c._id === course._id)
      ?.seenContent?.forEach((g) => {
        totalDuration += g.duration;
      });
    userObject?.courses
      ?.find((c) => c._id === course._id)
      ?.grades?.forEach((g) => {
        totalDuration += g.total * 5;
      });

    console.log("This is total Duration", totalDuration);
    console.log("this is course duration", course?.duration);
    setProgress(Math.ceil(totalDuration / (course?.duration * 60)) * 100);
  };
  const updateUserObject = (duration, id) => {
    userObject.courses
      .find((c) => c._id === course._id)
      .seenContent.push({ duration: duration, _id: id });
    calculateAndSetProgress();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton onClick={handleHome}>
            <HomeSharpIcon
              fontSize="large"
              style={{ fill: "#ffffff" }}
            ></HomeSharpIcon>
          </IconButton>
          <Linear progress={progress}></Linear>

          {/* Add Review button to the end of appbar */}
          <Link
            variant="h6"
            noWrap
            fontSize={15}
            onClick={handleClickOpen}
            fontWeight="13"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: "10px",
              color: "white",
              cursor: "pointer",
            }}
          >
            <StarBorderIcon fontSize="small" />
            Leave Rating
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Divider />
        {course?.outlines.map((outline, index) => {
          return (
            <AccordionSet
              index={index}
              outline={outline}
              userObject={userObject}
              course={course}
              handleVideoClick={handleVideoClick}
              handleExerciseClick={handleClickEx}
              updateUserObject={updateUserObject}
            ></AccordionSet>
          );
        })}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <RatingCourse
          isOpen={isOpen}
          handleClose={handleClose}
          handleSubmit={handleSubmitRatingAndReview}
        ></RatingCourse>
        <Dialog open={retakeOpen} onClose={() => setRetakeOpen(false)}>
          <DialogTitle>Retake Quiz</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have already solved this quiz. Do you want to retake it?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCancelRetake()}>Cancel</Button>
            <Button
              onClick={() => {
                handleRetake(exercise, exerciseId);
              }}
            >
              Retake
            </Button>
          </DialogActions>
        </Dialog>
        {showExerciseContent || showVideoContent ? (
          <VideoAndExercise
            content={content}
            exercise={exercise}
            exerciseId={exerciseId}
            courseId={course?._id}
            user={userObject}
            videoOpen={showVideoContent}
            exerciseOpen={showExerciseContent}
          ></VideoAndExercise>
        ) : (
          <CourseContentWelcomePage progress={80}></CourseContentWelcomePage>
        )}
      </Main>
    </Box>
  );
}
