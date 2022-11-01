import { Grid, Typography, TextField, Box, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel, TextareaAutosize, Button } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from 'tss-react/mui';
import Sections from "./addCourseContent";
import CourseDetails from "./addCourseDetails";

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


const AddCourseForm = () => {
    const { classes } = useStyles();
    const [stepNo, setStepNo] = useState("1");


    const [state, setState] = useState({
        title: "",
        category: "",
        cost: "",
        duration: "",
        weeks: "",
        description: "",
        image: "",
        sections: []
    })

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === "sections"){
            setState({
                ...state,
                sections: value
            })
        }
        setState({
            ...state,
            [name]: value
        })
        console.log(state);
    }

    const handleClick = () => {
        // console.log("WEEKS: " + state.weeks);
        if (stepNo === "1") {
            setStepNo("2");
        }
        if (stepNo === "2") {
            setStepNo("3");
        }

    }

    const handleBackClick = () => {
        if (stepNo === "2"){
            setStepNo("1");
        }
        if (stepNo === "3"){
            setStepNo("2");
        }

    }

    console.log(stepNo);

    
        return (
            <>
                {stepNo === "1" &&
                    <CourseDetails handleClick={handleClick}></CourseDetails>
                }

                {stepNo === "2" &&
                    <Sections handleClick={handleClick} handleBackClick={handleBackClick}></Sections>
                }

            </>
        );

};

export default AddCourseForm;