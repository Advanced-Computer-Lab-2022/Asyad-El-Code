import {
  Tab,
  Fab,
  Tabs,
  Box,
  AppBar,
  Grid,
  Container,
  Typography,
  Paper,
  Modal,
  FormControl,
  form,
  OutlinedInput,
  Input,
  InputLabel,
  FormGroup,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blue } from "@mui/material/colors";
import { reportProblem } from "../../../actions/reportedProblems";

export default function AdminModal({
  refund,
  reporterEmail,
  course,
  open,
  handleClose,
  handleRefundReasonChange,
  handleRefundTypeChange,
  refundType,
  refundReason,
  requestRefund,
}) {
  const dispatch = useDispatch();
  const [type, setType] = React.useState("");
  const [details, setDetails] = React.useState("");
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Type:", type);
    console.log("Details:", details);
    if (refund == false) {
      const problem = {
        reporterEmail: reporterEmail,
        courseId: course._id,
        courseName: course.title,
        type: type,
        details: details,
      };
      console.log(problem);
      dispatch(reportProblem(problem));
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle margin={1} id="form-dialog-title">
        {refund ? "Request Refund" : "Report Course"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText padding={1}>
          Please select the type of problem you are experiencing and provide any
          additional details that may be helpful
          {refund
            ? " to request a refund for this course."
            : " to report this course."}{" "}
          .
        </DialogContentText>
        <FormControl fullWidth>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={refund ? refundType : type}
            onChange={refund ? handleRefundTypeChange : handleTypeChange}
            label="Type"
            required
          >
            <MenuItem value="Technical">
              {refund ? "Technical issue with refund" : "Technical issue"}
            </MenuItem>
            <MenuItem value="Content">
              {refund ? "Content issue with refund" : "Content issue"}
            </MenuItem>
            <MenuItem value="Other">
              {refund ? "Other issue with refund" : "Other issue"}
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="details"
          label="Details"
          type="text"
          fullWidth
          value={refund ? refundReason : details}
          onChange={refund ? handleRefundReasonChange : handleDetailsChange}
          required
          sx={{ marginTop: "20px" }}
          multiline={true}
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            "&:hover": { backgroundColor: "#FAF9F6" },
            backgroundColor: "#FFFFFF",
            color: "#2F2B2E",
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={refund ? requestRefund : handleSubmit}
          sx={{
            "&:hover": { backgroundColor: "#FAF9F6" },
            backgroundColor: "#FFFFFF",
            color: "#2F2B2E",
            fontWeight: "bold",
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
