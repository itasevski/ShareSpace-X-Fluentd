import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {LocalOfferTwoTone} from "@material-ui/icons";
import CreateOfferForm from "../CreateOfferForm/CreateOfferForm";

const useStyles = makeStyles((theme) => ({
    typography: {
      marginBottom: "50px"
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
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
        marginLeft: theme.spacing(2)
    }
}));

const CreateOffer = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" className={classes.typography}>
                        <LocalOfferTwoTone />&nbsp;
                        Create your offer
                    </Typography>
                    <React.Fragment>
                            <React.Fragment>
                                <CreateOfferForm userCity={props.userCity}
                                                 userMunicipality={props.userMunicipality}
                                                 userType={props.userType}
                                                 userId={props.userId}
                                                 onServerError={props.onServerError}
                                                 onOfferCreate={props.onOfferCreate} />
                            </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default CreateOffer;