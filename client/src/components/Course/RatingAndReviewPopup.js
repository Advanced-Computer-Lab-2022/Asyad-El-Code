import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const RatingAndReviewPopup = ({
  ratingOpen,
  handleCancelRating,
  handleSubmit,
}) => {
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState("");
  //update RatingOpen to false when cancel button is clicked
  const handleCancel = () => {
    handleCancelRating();
  };
  const handleClick = () => {
    handleSubmit(ratingValue, review);
  };
  return (
    <>
      <Dialog open={ratingOpen}>
        <DialogTitle>Add a rating and review for the course</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a rating from 1 to 5</DialogContentText>
          <Rating
            name="simple-controlled-rating"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          />
          <DialogContentText>Add a review</DialogContentText>
          <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            onChange={(e) => setReview(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClick}>
            Submit
          </Button>
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
