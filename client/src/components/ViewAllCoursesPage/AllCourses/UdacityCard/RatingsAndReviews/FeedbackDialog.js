import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect } from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import * as courseApi from "../../../../../api/course";

export default function FeedbackDialog({ course, handleClose, open, scroll }) {
  const descriptionElementRef = React.useRef(null);

  const [userNames, setUserNames] = useState([]);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const getUserNames = async () => {
    console.log("course id" + course._id);
    const { data } = await courseApi.getUserNames(course._id);
    setUserNames(data);
  };
  React.useEffect(() => {
    getUserNames();
  }, []);

  const getTheAvatar = (name) => {
    const names = name?.split(" ");
    const first = names[0]?.charAt(0);
    const last = names[1]?.charAt(0);
    return first + last;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Stack columnGap={1} direction="row">
            <StarIcon style={{ color: "orange", marginTop: 2 }}></StarIcon>
            <Typography variant="h6">Ratings and Reviews</Typography>
          </Stack>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent
          style={{
            width: "900px",
            height: "100%",
          }}
          dividers={scroll === "paper"}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Grid rowSpacing={1} columnSpacing={1} container direction="row">
              {course.ratings?.length > 0 ? (
                course.ratings?.map((rate, index) => {
                  return (
                    <>
                      <Grid display="contents" item xs={4}>
                        <Avatar
                          style={{
                            backgroundColor: "black",
                            marginTop: 20,
                          }}
                        >
                          {userNames[index]
                            ? getTheAvatar(userNames[index])
                            : "AN"}
                        </Avatar>
                      </Grid>

                      <Grid item xs={8}>
                        <Stack spacing={-2} direction="column">
                          <p>
                            {userNames[index] ? userNames[index] : "Anonymous"}
                          </p>
                          <Rating value={rate.rating} size="small"></Rating>
                        </Stack>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="body1">
                          {course.reviews[index].review}
                        </Typography>
                        <Box
                          style={{
                            height: 20,
                          }}
                        ></Box>
                        <Divider></Divider>
                      </Grid>
                    </>
                  );
                })
              ) : (
                <>
                  <div>
                    <Typography variant="h6">No Reviews Yet</Typography>
                  </div>
                </>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
