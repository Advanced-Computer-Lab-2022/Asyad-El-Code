import React, { useState } from "react";
import { Grid, Button , Typography} from "@mui/material";
import Section from "./Section";

const initialFormState = {
  outlines: []
};

export const CourseOutline = ({ submitOutlines }) => {
  const [isExpanded, setExpanded] = React.useState(true);
  const [points, setPoints] = React.useState([]);
  const [sd, setSd] = React.useState(0);


  const addPoint = () => {
    console.log("sdfg");
    let arr = [];

    arr.push("dummy");
    // setPoints([...arr]);
    setPoints([...points, arr]);
    console.log(points.length);
    setSd(sd + 1);
  };

  const [initialForm, setInitialForm] = useState(initialFormState);
  const [open, setOpen] = useState([false, false]);


  const handleClose = () => setOpen(false);

  const submitOutline = (state) => {
    // setInitialForm([...initialForm, outlines:initialForm.outlines.push(state)]);
    // setInitialForm([...initialForm,outlines:newArray]);
    setInitialForm({...initialForm,outlines:[...initialForm.outlines,state]});
  

  };



  return (
    <div>

      <Grid
        container
        maxWidth="90%"
        margin="20px"
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item sm={12}>
          <div>
            {points.map((point, index) => (
              <Grid item xs={12}>
                <Section sd={sd} id={index + 1 } submitOutline={submitOutline} />
              </Grid>

            ))}
            <Button onClick={() => addPoint()}>Add Section</Button>
          </div>
        </Grid>
        <Grid item xs={2} alignItems="end" justifyContent="flex-end" alignContent="flex-end">
          <Button variant="contained" onClick={()=>submitOutlines(initialForm)}>Next</Button>
        </Grid>

      </Grid>
    </div>
  );
};
export default CourseOutline;
