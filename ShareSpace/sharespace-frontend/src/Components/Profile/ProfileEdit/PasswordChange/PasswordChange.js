import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from "@material-ui/core/Paper";
import PasswordChangeForm from "./PasswordChangeForm/PasswordChangeForm";
import StyleOne from "../../../../Utilities/Styles/SecurityFormStyles/StyleOne";

const PasswordChange = (props) => {
    const classes = StyleOne();

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        <React.Fragment>
                            <PasswordChangeForm userId={props.userId} onChangePassword={props.onChangePassword} onServerError={props.onServerError} />
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default PasswordChange;