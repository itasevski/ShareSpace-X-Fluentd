import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {CircularProgress, Typography} from "@material-ui/core";
import ShareSpaceService from "../../../Services/ShareSpaceService";
import {CheckCircle} from "@material-ui/icons";

const ContactForm = (props) => {
    const [state, setState] = React.useState({
        subject: "",
        body: "",

        success: false,

        messageSendInProgress: false
    });

    const handleFieldChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const subject = state.subject;
        const body = state.body;

        sendMessage(subject, body);
    }

    const sendMessage = (subject, body) => {
        ShareSpaceService.sendMessage(
            localStorage.getItem("userJwtToken"),
            props.userId,
            subject, body
        ).then(
            (data) => {
                setState({
                    ...state,
                    messageSendInProgress: false,
                    success: true
                });
            },
            (err) => {
                if(err.response === undefined) {
                    setState({
                        ...state,
                        error: true,
                        errorMessage: "Message not sent: The ShareSpace server is down.",
                        updateInProgress: false
                    });
                }
                else if(err.response.status === 403) {
                    props.onServerError();
                }
                else {
                    setState({
                        ...state,
                        error: true,
                        errorMessage: err.response.status + ": " + err.response.data.errorMessage,
                        updateInProgress: false
                    });
                }
            });

        setState({
            ...state,
            messageSendInProgress: true
        });
    }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Typography variant="h4" style={{ display: "block" }}>Contact info:</Typography>
                    </Grid>
                    <hr width={150} />
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1">Telephone number: +389 71 222 476</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1">Address: Share Space st. 20</Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1">E-mail: ivo_t@live.com</Typography>
                    </Grid>
                </Grid>
                {localStorage.getItem("userJwtToken") !== null &&
                <Grid container justifyContent="center">
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                <hr style={{ width: "85%", marginTop: "75px", marginBottom: "100px" }} />
                            </Grid>
                        </Grid>
                        <form onSubmit={handleFormSubmit}>
                            <Grid item xs={12}>
                                {state.success === true &&
                                <Grid container justifyContent="center">
                                    <Typography variant="subtitle1" style={{ color: "#4BB543" }}>
                                        <CheckCircle style={{ color: "#4BB543" }} />&nbsp;
                                        Your message has been successfully sent.
                                    </Typography>
                                </Grid>
                                }
                                <Grid container justifyContent="center">
                                    <Typography variant="h4" style={{ display: "block" }}>Leave us a message:</Typography>
                                </Grid>
                                <hr width={150} /><br />
                                {state.messageSendInProgress === true &&
                                <Grid container justifyContent="center">
                                    <CircularProgress style={{ margin: "15px" }} />
                                </Grid>
                                }
                                <Grid container justifyContent="center" style={{ marginTop: "15px" }}>
                                    <TextField
                                        id="subject"
                                        name="subject"
                                        label="Your subject"
                                        type="text"
                                        variant="outlined"
                                        style={{ width: "500px" }}
                                        required
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid container justifyContent="center" style={{ marginTop: "25px" }}>
                                    <TextField
                                        id="body"
                                        name="body"
                                        label="Your message"
                                        type="text"
                                        variant="outlined"
                                        style={{ width: "500px" }}
                                        required
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid container justifyContent="center" style={{ marginTop: "25px" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary">Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                </Grid>
                }
            </Grid>
        </React.Fragment>
    )
}

export default ContactForm;