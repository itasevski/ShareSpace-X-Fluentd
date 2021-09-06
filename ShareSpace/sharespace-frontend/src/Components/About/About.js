import React from "react";
import {Box, Grid, List, ListItem, Typography} from "@material-ui/core";
import Logo from "../../Images/logo.png";
import "./About.css";
import VideoMk from "../../Videos/guide-mk.mp4";
import VideoEng from "../../Videos/guide-eng.mp4";

const About = () => {
    return (
        <div id="aboutContainer">
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <img src={Logo} alt="ShareSpace Logo" />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Typography variant="body1" gutterBottom style={{ marginTop: "25px", fontSize: "25px", textAlign: "center", width: "50%" }}>
                            ShareSpace is a system where people can share expenses when using public transport. Its purpose is to help people save money,
                            time and make new friendships. Your journeys begin with us!<br />
                            <span style={{ fontSize: "18px", color: "gray" }}>This is the BETA version of the ShareSpace system. Some features may not be available yet, but will be in the final product.</span>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Typography variant="h3" style={{ marginTop: "25px" }}>
                            Guides
                        </Typography>
                    </Grid>
                    <hr width={100} />
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="center">
                        <Typography variant="h4" style={{ marginTop: "15px" }}>
                            Video guides
                        </Typography>
                    </Grid>
                    <hr width={150} />
                    <Grid container justifyContent="center">
                        <List>
                            <Box mb={2}>
                                <Typography variant="h6">Macedonian:</Typography>
                            </Box>
                            <ListItem>
                                <video src={VideoMk} width="600" height="300" controls="controls" />
                            </ListItem>
                            <Box mt={3} mb={2}>
                                <Typography variant="h6">English:</Typography>
                            </Box>
                            <ListItem>
                                <video src={VideoEng} width="600" height="300" controls="controls" />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="center">
                        <Typography variant="h4" style={{ marginTop: "15px" }}>
                            Descriptive guides
                        </Typography>
                    </Grid>
                    <hr width={150} />
                    <Grid container justifyContent="center">
                        <List>
                            <ListItem>
                                <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "20px" }}>1. </Typography>
                                <Typography variant="body1">On the home page, you can see some derived statistics about the ShareSpace system.</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "20px" }}>2. </Typography>
                                <Typography variant="body1">You also have many options to select from. You can register, view available offers if you have already been registered and have logged in, or you can read the COVID-19 regulations or guides published in the system.</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "20px" }}>3. </Typography>
                                <Typography variant="body1">The header contains the navigation menu. You can navigate to the home page, about page, contact page or offers page. On the right end side of the header you either have options to login or register as a new user, or if you have already logged in you would have options to log out, view and customize your profile and view received targeted notifications.</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "20px" }}>4. </Typography>
                                <Typography variant="body1">In the footer you will find ShareSpace's social links.</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "20px" }}>5. </Typography>
                                <Typography variant="body1">In the about page you can read some info about ShareSpace or read or watch usage guides. In the Contact page you can gather ShareSpace's contact info or you can send a personal message regarding your needs or remarks, which will later be reviewed and answered.</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "20px" }}>6. </Typography>
                                <Typography variant="body1">The Offers page is the heart of the system. Log in or register and navigate to the Offers page using the link in the Home page or the link in the navigation menu of the header. On this page you will be able to view targeted offers based on your location (city and municipality you are currently in). You have the option to join these offers, or you can create your own offer by clicking on the "Create offer" button. Also, you can disable the location filter and view all published offers, by clicking on the "X" in the upper right side of the page. You can apply other filters as well, by clicking on the "Apply filters" button and selecting the desired filters, which can also be removed by clicking on the "X" buttons next to them. You can also search for specific offers by entering any keyword, or you can sort the offers based on numerous sorting criteria.</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1" style={{ fontWeight: "bold", marginRight: "20px" }}>7. </Typography>
                                <Typography variant="body1">It is strongly recommended that you leave the city and municipality fields pre-filled by our geolocation services and not change them, since many operations in the system depend on that information. These fields are pre-filled when registering or creating an offer. If you're registering or creating an offer from one location but then return to another location, either wait until you reach your final destination or make certain that you input valid information for the offer target location (city and municipality) or your residing/home location.</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default About;