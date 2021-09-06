import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {VerifiedUserRounded} from "@material-ui/icons";
import ProfileEditForm from "../ProfileEditForm/ProfileEditForm";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    typography: {
        marginBottom: "25px"
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: "75%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));

const ProfileEdit = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" className={classes.typography}>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Grid container justifyContent="center">
                                        <hr style={{ width: "85%", marginTop: "75px" }} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Grid container justifyContent="center">
                                        <VerifiedUserRounded style={{ fontSize: "150px" }} />
                                    </Grid>
                                    <Grid container justifyContent="center">
                                        <Typography variant="h4">{props.userInfo.firstName} {props.userInfo.lastName}</Typography>
                                    </Grid>
                                    <Grid container justifyContent="center">
                                        <Typography variant="h6">{props.userInfo.type}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                    <Grid container justifyContent="center">
                                        <hr style={{ width: "85%", marginTop: "75px" }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                    </Typography>
                    <React.Fragment>
                        <React.Fragment>
                            <ProfileEditForm userInfo={props.userInfo} onProfileEdit={props.onProfileEdit} onServerError={props.onServerError} />
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default ProfileEdit;