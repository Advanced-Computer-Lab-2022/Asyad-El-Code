import { Grid, Typography, Box, TextField, FormControl, Input, InputLabel, FormHelperText, OutlinedInput, FormGroup, Select, MenuItem, } from "@mui/material";
import React from "react";
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => {
  return {
    formStyle: {
      margin: "50px",
      backgroundColor: "aqua",

    },
    textStyle: {
      color: "gold"
    }
  };
});


const Instructor = () => {
  const { classes } = useStyles();
  console.log(classes);
  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        className={classes.formStyle}
      >

        <Grid container spacing={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
          columnSpacing={7}
          >


          <Grid item xs={2}>
            <FormControl required>
              <InputLabel htmlFor="component-outlined">Course Title</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value=""
                label="Course Title"
              />
            </FormControl>
          </Grid>


          <Grid item xs={2}>
            <FormControl required fullWidth>
              <InputLabel id="demo-simple-select-label">Specialization</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Specialization"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Computer Science</MenuItem>
                <MenuItem value={20}>Commerce</MenuItem>
                <MenuItem value={30}>Finance</MenuItem>
                <MenuItem value={30}>Robotics</MenuItem>
                <MenuItem value={30}>Project Management</MenuItem>
                <MenuItem value={30}>Logistics</MenuItem>

              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={2}>
            <FormControl required>
              <InputLabel htmlFor="component-outlined">Cost</InputLabel>
              <OutlinedInput
                id=""
                value=""
                label="Cost"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="component-outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />

          </Grid>
          <Grid item xs={4}>

            <TextField id="outlined-search" label="Search field" type="search" />
          </Grid>
          <Grid item xs={4}>

            <TextField
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
            />
          </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default Instructor;