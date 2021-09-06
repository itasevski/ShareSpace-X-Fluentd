import React from "react";
import {Box, Grid, List, ListItem, ListItemIcon, Typography} from "@material-ui/core";
import "./CovidRegulations.css";
import {LocalHospitalOutlined} from "@material-ui/icons";

const CovidRegulations = () => {
    return (
        <div id="covidRegulationsContainer">
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Typography variant="h2">COVID-19 REGULATIONS</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8} style={{ marginTop: "25px" }}>
                    <Grid container justifyContent="center">
                        <List>
                            <Box>
                                <Typography variant="h6">For everybody</Typography>
                            </Box>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>No face mask - No ride</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">All drivers and passengers must wear a face cover or mask when using ShareSpace, even when vaccinated. We must protect ourselves and those around us. Wearing face masks is necessary and is required.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Help keep your environment safe</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">We’re reminding everyone who uses the ShareSpace system to follow advice from public health authorities. If you’re sick, stay home and away from others. Wash your hands frequently, and cover your cough or sneeze.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Sanitize your hands</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">It is recommended that every user of the ShareSpace system carries a hand sanitizer with himself/herself at all times.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Stay at home if you're feeling sick</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">If you're not feeling well, the most important thing you should do is stay home, if possible, to prevent the spreading of COVID-19. Putting other users at risk may lead to temporary or permanent termination of your account.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Vaccinate</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">It is strongly recommended that you get vaccinated.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Stay informed and stay safe</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">Keep in touch with the latest information about COVID-19 by frequently visiting the <a href="https://www.who.int/" target="_blank">World Health Organization website</a>, as well as your local news websites and TV channels.</Typography>
                            </ListItem>
                            <Box mt={3} mb={1}>
                                <Typography variant="h6">For drivers</Typography>
                            </Box>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Cover your mouth and nose</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">If you sneeze or cough, do so into your elbow or a tissue.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Ask passengers to maintain distance</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">It’s OK to ask passengers to sit in the back to give you more space.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Open the window</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">If possible, roll down the windows to improve ventilation.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Health supplies for your vehicle</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">Make sure you have a hand sanitizer in your car, as well as wet wipes, first aid kit etc.</Typography>
                            </ListItem>
                            <Box mt={3} mb={1}>
                                <Typography variant="h6">For passengers</Typography>
                            </Box>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Wash your hands</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">Wash your hands before and after you ride.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Cover your mouth and nose</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">If you sneeze or cough, do so into your elbow or a tissue.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Sit in the back</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">Give your driver space by sitting in the back seat.</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{ width: "330px" }}>
                                    <LocalHospitalOutlined />
                                    <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "50px" }}>Open the window</Typography>
                                </ListItemIcon>
                                <Typography variant="body1">If possible, roll down the window to improve ventilation.</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default CovidRegulations;