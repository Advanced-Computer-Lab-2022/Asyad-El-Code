import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Button, Grid, Input, InputLabel, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import LectureDetails from "./LectureDetails";
import Exercise from "./Exercise";





const initialFormState = {
    outline: "",
    totalHours: "",
    subtitles: [],
    exercises: []
};




const Section = (props) => {
    console.log(props);
    const [expanded, setExpanded] = useState("");
    const [open, setOpen] = useState([false, false]);
    const [initialForm, setInitialForm] = useState(initialFormState);
    const [totalMinutes, setTotalMinutes] = useState(0);



    const handleChangeAcc = (panel) => (evt, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChange = (e) => {
        const val = e.target.value;
        const key = e.target.name;

        setInitialForm({ ...initialForm, [key]: val });
    };


    const OpenLectureModal = () =>
        setOpen((prev) => {
            prev[0] = !prev[0];
            return [...prev];
        });

    const OpenQuizModal = () =>
        setOpen((prev) => {
            prev[1] = !prev[1];
            return [...prev];
        });


    const submitContent = (state, type) => {
        if (type === "subtitles") {
            console.log("HEYYYY: " + state.minutes);
            // totalMinutes = totalMinutes + parseInt(state.minutes);
            setTotalMinutes(totalMinutes+parseInt(state.minutes));
            console.log("Tot: "+ totalMinutes);
            console.log(state);
            setInitialForm({...initialForm,subtitles:[...initialForm.subtitles,state]});

        }
        else setInitialForm({ ...initialForm, exercises:[...initialForm.exercises, state] });
    };

    const submitSection = () => {
        console.log("TOTAL MINUTES: "+ totalMinutes);
        setInitialForm({ ...initialForm, totalHours: totalMinutes });
        props.submitOutline(initialForm);
        
    }

    return (
        <form>
            <LectureDetails
                open={open[0]}
                handleClickOpen={OpenLectureModal}
                handleClose={OpenLectureModal}
                submitContent={submitContent}
            ></LectureDetails>

            <Exercise
                open={open[1]}
                handleClickOpen={OpenQuizModal}
                handleClose={OpenQuizModal}
                submitContent={submitContent}
            ></Exercise>

            <Accordion
                key={props.id}
                expanded={expanded === props.sd}
                onChange={handleChangeAcc(props.sd)}
                sx={{ margin: "20px" }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1bh-header"
                    aria-controls="panel1bh-content"
                >
                    <Typography> Section no.{props.id} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container rowSpacing={4}>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Section name"
                                name="outline"
                                onChange={handleChange}
                            ></TextField>
                        </Grid>
                        <Grid item display="flex" justifyContent="end" container>
                            <Button onClick={OpenLectureModal}>Lecture</Button>
                            <Button onClick={OpenQuizModal}>Add Quiz</Button>
                            <Button onClick={submitSection}>
                                Submit Section
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </form>
    );
};

export default Section;