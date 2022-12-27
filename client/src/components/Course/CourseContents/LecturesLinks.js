import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function LecturesLinks({ subtitles }) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  console.log(subtitles);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Demo>
            <List dense={dense}>
              {subtitles.map((sub, index) => {
                return (
                  <>
                    <ListItem>
                      <ListItemIcon>
                        <PlayCircleIcon></PlayCircleIcon>
                      </ListItemIcon>
                      <ListItemText primary={sub.subtitle} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <QuizIcon></QuizIcon>
                      </ListItemIcon>
                      <ListItemText primary={`Exercise`} />
                    </ListItem>
                  </>
                );
              })}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
