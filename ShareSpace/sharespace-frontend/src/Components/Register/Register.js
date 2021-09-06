import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from "@material-ui/core/Paper";
import RegisterForm from "./RegisterForm/RegisterForm";
import StyleOne from "../../Utilities/Styles/SecurityFormStyles/StyleOne";

const Register = (props) => {
    const classes = StyleOne();

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        <React.Fragment>
                            <RegisterForm userCity={props.userCity} userMunicipality={props.userMunicipality} />
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default Register;