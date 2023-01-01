import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Input,
  Fab,
  Alert,
} from "@mui/material";
import * as individualTraineeApi from "../../../api/individualTrainees.js";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import axios from "axios";

const Notes = ({ content, playedMinutes, lectureId, userId, courseId }) => {
  const [rows, setRows] = useState(1);
  const [isClicked, setClicked] = useState(false);
  const [note, setNote] = useState("");
  const [notesOfUser, setNotesOfUser] = useState();
  const [isChanged, setChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleFoucs = () => {
    setRows(3);
    setClicked(true);
  };

  const addNote = async () => {
    const { data } = await individualTraineeApi.addNote(
      userId,
      courseId,
      lectureId,
      note,
      playedMinutes
    );
    setChanged((prev) => !prev);
  };
  const createAndDownloadPdf = async () => {
    const _ = await individualTraineeApi.createPdf(notesOfUser);
    const { data } = await individualTraineeApi.getPdf();

    const blob = new Blob([data], { type: "application/pdf" });
    saveAs(blob, "notes.pdf");
  };
  // const fetchAllNotesOfLecture = async () => {
  //   const { data } = await individualTraineeApi.getAllNotes(
  //     courseId,
  //     lectureId
  //   );
  // };
  const fetchNotesOfUser = async () => {
    const { data } = await individualTraineeApi.getNotes(
      userId,
      courseId,
      lectureId
    );
    setNotesOfUser(data.note.reverse());
  };
  useEffect(() => {
    fetchNotesOfUser();
  }, []);
  useEffect(() => {
    fetchNotesOfUser();
  }, [isChanged, lectureId]);

  return (
    <Container>
      <Typography gutterBottom variant="h4" sx={{ color: "#000000" }}>
        Notes
      </Typography>

      <Grid width="900px" container columnSpacing={-50}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            multiline
            fullWidth
            rows={rows}
            onFocus={handleFoucs}
            onChange={(e) => setNote(e.target.value)}
            // onBlur={() => {
            //   setRows(1);
            //   setClicked(false);
            // }}
            label={`Create a new note at ${playedMinutes} `}
          ></TextField>
        </Grid>
        {isClicked && (
          <Grid
            mt={2}
            item
            columnSpacing={2}
            container
            justifyContent="flex-end"
          >
            <Grid item>
              <Button
                onClick={() => setClicked(false)}
                variant="outlined"
                size="small"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={addNote} variant="contained" size="small">
                Save note
              </Button>
            </Grid>
            <Grid item>
              <Fab
                onClick={createAndDownloadPdf}
                color="primary"
                aria-label="add"
              >
                <DownloadIcon />
              </Fab>
            </Grid>
          </Grid>
        )}
        {isChanged && (
          <Alert>
            <Typography>Added note successfully</Typography>
          </Alert>
        )}

        {isLoading ? (
          <Alert severity="info">Loading...</Alert>
        ) : (
          notesOfUser?.map((note) => {
            return (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box height="40px"></Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    style={{ fontWeight: "bold" }}
                    size="small"
                    sx={{ borderRadius: 20 }}
                    variant="contained"
                  >
                    {note.time}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Paper
                    style={{ padding: 20, backgroundColor: "#F7F9FA" }}
                    elevation={2}
                  >
                    {note.value}
                  </Paper>
                </Grid>
              </>
            );
          })
        )}
      </Grid>
    </Container>
  );
};
export default Notes;
