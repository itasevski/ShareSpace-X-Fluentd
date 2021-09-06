import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from "@material-ui/core/Paper";
import LoginForm from "./LoginForm/LoginForm";
import StyleOne from "../../Utilities/Styles/SecurityFormStyles/StyleOne";

const Login = (props) => {
    const classes = StyleOne();

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        <React.Fragment>
                            <LoginForm onLogin={props.onLogin} />
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default Login;