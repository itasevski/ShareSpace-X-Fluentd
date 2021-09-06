import React from "react";
import Carousel from "react-material-ui-carousel";
import ProgressCircle from "../../Utilities/CircularProgress/ProgressCircle/ProgressCircle";
import "./Home.css";
import {
    DriveEta,
    EmojiPeople,
    LocalHospital,
    Person
} from "@material-ui/icons";
import {Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const Home = (props) => {
    return (
        <div>
            <div id="homeCarouselContainer">
                <Carousel id="homeCarousel">
                    {
                        props.items.map( (item) => <ProgressCircle size={400} componentId={"circularContainer"} item={item} /> )
                    }
                </Carousel>
            </div>
            <div id="homeActionsContainer">
                <Grid container>
                    <Grid item xs={8}>
                        <Grid container justifyContent="center">
                            <div className="homeAction">
                                <Link className="homeActionLink" to="/register">
                                    <DriveEta style={{ fontSize: "200px" }} />
                                    <Grid container justifyContent="center">
                                        <Typography variant="h6">
                                            Register as a driver
                                        </Typography>
                                    </Grid>
                                </Link>
                            </div>
                            <div className="homeAction">
                                <Link className="homeActionLink" to="/register">
                                    <Person style={{ fontSize: "200px" }} />
                                    <Grid container justifyContent="center">
                                        <Typography variant="h6">
                                            Register as a <br /> passenger
                                        </Typography>
                                    </Grid>
                                </Link>
                            </div>
                            <div className="homeAction">
                                <Link className="homeActionLink" to="/offers">
                                    <EmojiPeople style={{ fontSize: "200px" }} />
                                    <Grid container justifyContent="center">
                                        <Typography variant="h6">
                                            View offers
                                        </Typography>
                                    </Grid>
                                </Link>
                            </div>
                            <div className="homeAction">
                                <Link className="homeActionLink covidLink" to="/covidRegulations">
                                    <LocalHospital style={{ fontSize: "200px" }} />
                                    <Grid container justifyContent="center">
                                        <Typography variant="h6">
                                            COVID-19 Regulations
                                        </Typography>
                                    </Grid>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container>
                            <Typography variant="h1">New here?</Typography>
                        </Grid>
                        <Grid container>
                            <Typography variant="h4">Start by watching some of our&nbsp;
                                <Link to="/about" style={{ color: "#03a9f4" }}>guides</Link>.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )

}

export default Home;