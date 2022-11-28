import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import CoursePreview from "./CoursePreview";
import Section from "./Section";
import { useDispatch } from "react-redux";
import { createCourse } from "../../actions/courses";
import AlertDialog from "./Alert";


const initialFormState = {
    title: "",
    summary: "",
    subject: "",
    duration: "0.00", // automatically calculated
    releaseDate: "0000-00-00", //auto fill with current date
    language: "",
    image: "",
    rating: 0.0, //default
    previewVideo: "",
    outlines: [],
    price: "",
    instructor: {
        instructorId: "635c587e07f18b986c357bb7",
        name: "klllllll",
    },
    discount: [{ country: "", precentage: "" }],
};



function CourseSteps() {
    const [activeStep, setActiveStep] = useState(0);
    const [initialForm, setInitialForm] = React.useState(initialFormState);

    const [points, setPoints] = React.useState([]);
    const [sd, setSd] = React.useState(0);
    const [count, setCount] = React.useState(1);
    const [mapState, setMapState] = useState(new Map());
    const [sections, setSections] = useState(new Map());
    const [ready, setReady] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState("Create Course");
    const [alertMessage, setAlertMessage] = useState("You are about to create a new course. Are you sure you want to continue?");

    const dispatch = useDispatch();
    const handleAlertDialogue = () => {
        setOpenAlert(!openAlert);
    };




    useEffect(() => {
        let arr = [];
        let duration = 0.00;
        for (let value of mapState.values()) {
            arr.push(value);
            duration += parseInt(value.totalHours);
        }
        duration = duration / 60;
        duration = duration.toFixed(2);
        setInitialForm({ ...initialForm, outlines: arr, duration: duration });
    }, [mapState]);

    useEffect(() => {
        if (ready) {
            dispatch(createCourse(initialForm));
        }
    }, [ready]);

    const updateMap = (key, value) => {
        setMapState(map => new Map(map.set(key, value)));
        setSections(map => new Map(map.set(key, value)));
    }
    const deleteMap = (key) => {
        setMapState((prev) => {
            const newState = new Map(prev);
            newState.delete(key);
            return newState;
        });
        setSections((prev) => {
            const newState = new Map(prev);
            newState.delete(key);
            return newState;
        });
    }

    const addPoint = () => {
        let arr = [];
        var section = { outline: "", totalHours: "0", subtitles: [], exercises: [] };
        arr.push(count);
        setPoints([...points, arr]);
        setSections(map => new Map(map.set(count, section)));
        setCount(count + 1);
        console.log(points.length);
        console.log(count);
        setSd(sd + 1);
    };

    const submitOutline = (id, state) => {
        updateMap(id, state);
    };

    const deleteSection = (id) => {
        deleteMap(id);
        setPoints((current) => current.filter((section) => section[0].id !== id));
        setSd(0);
    }


    async function nextStep() {
        if (activeStep === 2) {
            const date = new Date().toJSON();
            console.log("THE DATE: ", date);
            setInitialForm({ ...initialForm, releaseDate: date });

            handleAlertDialogue();
        } else setActiveStep((currentStep) => currentStep + 1);

    }
    const prevStep = () => {
        if (activeStep > 0)
            setActiveStep((currentStep) => currentStep - 1);
    }

    const handleChange = (e) => {
        const val = e.target.value;
        const key = e.target.name;
        setInitialForm({ ...initialForm, [key]: val });
    };

    const alertAction = () => {
        setReady(true);
    }



    return (
        <>
            <AlertDialog
                open={openAlert}
                handleClose={handleAlertDialogue}
                title={alertTitle}
                message={alertMessage}
                action={alertAction}
                color="primary"
            ></AlertDialog>
            <Grid container maxWidth="80%" marginTop={5} marginLeft={20} marginRight={20} marginBottom={5} direction="row" justifyContent="center" alignItems="center">

                <Grid item xs={12}>
                    <Stepper activeStep={activeStep}>
                        <Step>
                            <StepLabel>Course Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Course Content</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Course Preview</StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
                <Grid item sm={1}>
                </Grid>
                <Grid item sm={10}>
                    <div>
                        {activeStep === 0 ? (
                            <Box>
                                <form>
                                    <Grid
                                        container
                                        spacing={4}
                                        maxWidth="90%"
                                        margin="20px"
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="title"
                                                name="title"
                                                label="Course Title"
                                                fullWidth
                                                variant="outlined"
                                                onChange={handleChange}
                                                value={initialForm.title}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="price"
                                                name="price"
                                                label="Cost"
                                                fullWidth
                                                variant="outlined"
                                                type="number"
                                                onChange={handleChange}
                                                value={initialForm.price}

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <FormControl required fullWidth>
                                                <InputLabel id="language-select-label">
                                                    Language
                                                </InputLabel>
                                                <Select
                                                    labelId="language-select-label"
                                                    id="language-select"
                                                    name="language"
                                                    label="Language"
                                                    onChange={handleChange}
                                                    value={initialForm.language}

                                                >
                                                    <MenuItem value={"Arabic"}>Arabic</MenuItem>
                                                    <MenuItem value={"English"}>English</MenuItem>
                                                    <MenuItem value={"French"}>French</MenuItem>
                                                    <MenuItem value={"German"}>German</MenuItem>
                                                    <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
                                                    <MenuItem value={"Spanish"}>Spanish</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <FormControl required fullWidth>
                                                <InputLabel id="category-select-label">
                                                    Category
                                                </InputLabel>
                                                <Select
                                                    labelId="category-select-label"
                                                    id="category-select"
                                                    name="subject"
                                                    label="Category"
                                                    onChange={handleChange}
                                                    value={initialForm.subject}

                                                >
                                                    <MenuItem value={"Computer Science"}>
                                                        Computer Science
                                                    </MenuItem>
                                                    <MenuItem value={"Commerce"}>Commerce</MenuItem>
                                                    <MenuItem value={"Finance"}>Finance</MenuItem>
                                                    <MenuItem value={"Robotics"}>Robotics</MenuItem>
                                                    <MenuItem value={"Project Management"}>
                                                        Project Management
                                                    </MenuItem>
                                                    <MenuItem value={"Logistics"}>Logistics</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="previewVideo"
                                                name="previewVideo"
                                                label="Video Preview"
                                                fullWidth
                                                variant="outlined"
                                                onChange={handleChange}
                                                value={initialForm.previewVideo}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="summary"
                                                name="summary"
                                                label="Description"
                                                fullWidth
                                                variant="outlined"
                                                onChange={handleChange}
                                                value={initialForm.summary}

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="image"
                                                name="image"
                                                label="Image URL"
                                                fullWidth
                                                variant="outlined"
                                                onChange={handleChange}
                                                value={initialForm.image}
                                            />
                                        </Grid>
                                        <Grid item xs={9}></Grid>
                                        <Grid
                                            item
                                            xs={2}
                                            alignItems="end"
                                            justifyContent="flex-end"
                                            alignContent="flex-end"
                                        >
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        ) : activeStep === 1 ? (
                            <>
                                <Grid item sm={12}>
                                    <div>
                                        {[...sections.keys()].map(k => (
                                            <Grid item xs={12}>
                                                <Section sd={sd} id={k} index={k} submitOutline={submitOutline} deleteSection={deleteSection} initialForm={sections.get(k)} updateSection={updateMap} />
                                            </Grid>

                                        ))}
                                        <Button onClick={() => addPoint()}>Add Section</Button>
                                    </div>
                                </Grid>
                            </>
                        ) : activeStep === 2 ? (
                            <CoursePreview course={initialForm}></CoursePreview>
                        ) : null}
                    </div>
                </Grid>
                <Grid item sm={1}>
                </Grid>
                <Grid item sm={6} display="flex" justifyContent="start" container>
                    <Button onClick={prevStep} variant="outlined">Previous</Button>
                </Grid>

                <Grid item sm={6} display="flex" justifyContent="end" container>
                    <Button onClick={nextStep} variant="contained"> {activeStep === 2 ? "Create" : "Next"}</Button>
                </Grid>

            </Grid>
        </>
    );

}

export default CourseSteps;