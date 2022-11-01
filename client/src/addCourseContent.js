import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Grid } from '@mui/material';
import PointPanel from './pointPanel';



const Sections = (props) => {
    const [expanded, setExpanded] = React.useState(false);
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
    console.log("p", points);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Grid container spacing={5} maxWidth="40%" margin="20px" direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Page 2/3
                    </Typography>
                </Grid>
                {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Section 1
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                            Aliquam eget maximus est, id dignissim quam.
                        </Typography>
                    </AccordionDetails>
                </Accordion>



                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            You are currently not an owner
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                            laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion> */}

                {points.map((point, index) => (
                    <Grid item xs={12}>
                        <PointPanel sd={sd} id={index + 1} />
                    </Grid>

                ))}

                <Grid item xs={12}>
                    <Button onClick={() => addPoint()}>
                        Add a New Section
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' color="secondary" onClick={props.handleBackClick} >Back</Button>
                </Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={props.handleClick}>Next</Button>
                </Grid>

            </Grid>
        </div>
    );
}

export default Sections;