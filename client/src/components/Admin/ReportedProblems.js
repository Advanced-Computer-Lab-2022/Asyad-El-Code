import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  TextField,
} from "@mui/material";
import React from "react";
import SplitButton from "./SplitButton";

const ReportedProblems = (props) => {
  const [reportedProblems, setReportedProblems] = React.useState(
    props?.reportedProblems
  );

  const onChange = (e) => {
    setReportedProblems(
      reportedProblems?.map((problem) => {
        if (problem._id === e.target.id) {
          problem.response = e.target.value;
        }
        return problem;
      })
    );
  };
  

  return (
    <Grid
      container
      maxWidth="100%"
      marginBottom={5}
      spacing={5}
      direction="row"
      alignItems="center"
    >

      {reportedProblems?.map((problem) => (
        <>
          
          <Grid item xs={12} lg={6} key={problem._id}>
            <Card sx={{ minWidth: 500 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {problem?.reporterEmail} has reported a problem on{" "}
                  {problem?.courseName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {problem?.date?.substring(0, 10) +
                    ",     " +
                    problem?.date?.substring(11, 16) +
                    " GMT    "}
                  <Chip label={problem?.type} />
                </Typography>
                <Typography variant="body2">
                  <span style={{ fontWeight: "bold" }}>Details: </span>{" "}
                  {problem?.details}
                </Typography>
                <TextField
                  id={problem._id}
                  required
                  multiline
                  label="Response"
                  rows={3}
                  variant="outlined"
                  sx={{ width: "100%", marginTop: 2, marginBottom: 1 }}
                  value={problem.response}
                  onChange={onChange}
                ></TextField>
              </CardContent>
              <CardActions>
                <Grid container spacing={1}>
                  <Grid item xs={9}></Grid>

                  <Grid item xs={2}>
                    <SplitButton problem={problem} />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default ReportedProblems;
