import { Grid, Typography, TextField, Box, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel, TextareaAutosize, Button } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from 'tss-react/mui';
import Sections from "./addCourseContent";

const useStyles = makeStyles()((theme) => {
    return {
        formStyle: {
            margin: "50px",
            backgroundColor: "aqua",

        },
        textArea: {
            color: "gold",
            minHeight: "100px"
        },
        boxStyle: {
            border: "1px",
            borderRadius: "30px",
            borderColor: "red",
            width: "50%",
            margin: "10px",


        }
    };
});


const handleClick = (e) => {
    e.preventDefault()
    console.log(e.target.title.value)
    console.log(e.target.price.value)
    console.log(e.target.description.value)
}

const CourseDetails = (props) => {
    const { classes } = useStyles();
    console.log(props);

    const [state, setState] = useState({
        title: "",
        category: "",
        cost: "",
        duration: "",
        weeks: "",
        description: "",
        image: ""
    })

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setState({
            ...state,
            [name]: value
        })
        console.log(state);
    }
    // const handleClick = () => {
    //     // console.log("WEEKS: " + state.weeks);
    //     if (stepNo === "1") {
    //         setStepNo("2");
    //     }

    // }
    return (
        <Box>

        <form onSubmit={handleClick}>

            <Grid container spacing={5} maxWidth="40%" margin="20px" direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Page 1/3
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Course Title"
                        fullWidth
                        variant="outlined"
                        value={state.title}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth>
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            name="category"
                            value={state.category}
                            label="Category"
                            onChange={handleChange}
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

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="price"
                        name="cost"
                        label="Cost"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={state.cost}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="duration"
                        name="duration"
                        label="Duration"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={state.duration}
                        onChange={handleChange}
                    />
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="weeks"
                        name="weeks"
                        label="Weeks"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={state.weeks}
                        onChange={handleChange}
                    />
                </Grid> */}

                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        variant="outlined"
                        value={state.description}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="imageURL"
                        name="imageURL"
                        label="Image URL"
                        fullWidth
                        variant="outlined"
                        value={state.image}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={9}></Grid>
                <Grid item xs={2} alignItems="end" justifyContent="flex-end" alignContent="flex-end">
                    <Button variant="contained" onClick={props.handleClick} >Next</Button>
                </Grid>
            </Grid>
        </form>
    </Box>
    );

};

export default CourseDetails;