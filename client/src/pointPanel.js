import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography, FormControl, FormGroup, Grid, Input, InputLabel, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const PointPanel = (props) => {
    console.log(props);
    const [expanded, setExpanded] = React.useState("");

    const handleChange = (panel) => (evt, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <form>
            <Accordion
                key="p1"
                expanded={expanded === props.sd}
                onChange={handleChange(props.sd)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1bh-header"
                    aria-controls="panel1bh-content"
                >
                    <Typography> Section no.{props.id} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <Grid Grid container spacing={5} direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="subtitle"
                                    name="subtitle"
                                    label="Subtitle"
                                    fullWidth
                                    variant="outlined"
                                    // value={state.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="hours"
                                    name="hours"
                                    label="Hours"
                                    fullWidth
                                    variant="outlined"
                                    // value={state.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="video"
                                    name="video"
                                    label="Video Link"
                                    fullWidth
                                    variant="outlined"
                                    // value={state.title}
                                    onChange={handleChange}
                                />
                            </Grid>

                        </Grid>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </form>
    );
};

export default PointPanel;
