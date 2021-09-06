import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {CircularProgress, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import {Error, VpnKey} from "@material-ui/icons";
import StyleTwo from "../../../../../Utilities/Styles/SecurityFormStyles/StyleTwo";
import ShareSpaceService from "../../../../../Services/ShareSpaceService";
import {useHistory} from "react-router-dom";

const PasswordChangeForm = (props) => {
    const classes = StyleTwo();
    const history = useHistory();

    const [state, setState] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",

        arePasswordsEqual: true,
        areOldAndNewPasswordsEqual: false,
        isPasswordLengthValid: true,
        isPasswordAlphanumeric: true,

        error: false,
        errorMessage: {},

        changePasswordInProgress: false
    });

    const handleFieldChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const oldPassword = state.oldPassword;
        const newPassword = state.newPassword;
        const confirmNewPassword = state.confirmNewPassword;

        if(validateNewPassword(oldPassword, newPassword, confirmNewPassword)) {
            changePassword(oldPassword, newPassword, confirmNewPassword);
        }
        else {
            console.error("Password change failed.");
        }
    }

    const changePassword = (oldPassword, newPassword, confirmNewPassword) => {
        ShareSpaceService.changeCurrentUserPassword(
            localStorage.getItem("userJwtToken"),
            props.userId,
            oldPassword, newPassword, confirmNewPassword
        ).then(
            (data) => {
                localStorage.setItem("successfulPasswordChange", "true");
                props.onChangePassword();
                history.push("/login");
            },
            (err) => {
                if(err.response === undefined || err.response.status !== 400) {
                    props.onServerError();
                }
                else {
                    setState({
                        ...state,
                        error: true,
                        errorMessage: err.response.status + ": " + err.response.data.errorMessage,

                        arePasswordsEqual: true,
                        areOldAndNewPasswordsEqual: false,
                        isPasswordLengthValid: true,
                        isPasswordAlphanumeric: true,

                        changePasswordInProgress: false
                    });
                }
            });

        setState({
            ...state,
            changePasswordInProgress: true
        });
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <VpnKey />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change password
                    </Typography>
                    {state.changePasswordInProgress === true &&
                    <CircularProgress style={{ margin: "15px" }} />
                    }
                    {state.areOldAndNewPasswordsEqual === true &&
                    <Typography variant="subtitle1" color="secondary">
                        <Error color="secondary" />&nbsp;
                        Old password can't be equal to new password
                    </Typography>
                    }
                    {state.arePasswordsEqual === false &&
                    <Typography variant="subtitle1" color="secondary">
                        <Error color="secondary" />&nbsp;
                        Passwords do not match
                    </Typography>
                    }
                    {state.isPasswordLengthValid === false &&
                    <Typography variant="subtitle1" color="secondary">
                        <Error color="secondary" />&nbsp;
                        Password must be at least 6 characters long
                    </Typography>
                    }
                    {state.isPasswordAlphanumeric === false &&
                    <Typography variant="subtitle1" color="secondary">
                        <Error color="secondary" />&nbsp;
                        Password must be alphanumeric
                    </Typography>
                    }
                    {state.error === true &&
                    <Typography variant="subtitle1" color="secondary">
                        <Error color="secondary" />&nbsp;
                        {state.errorMessage}
                    </Typography>
                    }
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="oldPassword"
                            label="Old password"
                            type="password"
                            name="oldPassword"
                            autoComplete="oldPassword"
                            autoFocus
                            onChange={handleFieldChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New password"
                            type="password"
                            id="newPassword"
                            autoComplete="newPassword"
                            onChange={handleFieldChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmNewPassword"
                            label="Reenter new password"
                            type="password"
                            id="confirmNewPassword"
                            autoComplete="newPasswordReentered"
                            onChange={handleFieldChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Confirm
                        </Button>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    )

    function validateNewPassword(oldPassword, newPassword, confirmNewPassword) {
        var regex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))/;

        var arePasswordsEqual = newPassword === confirmNewPassword;
        var isPasswordLengthValid = newPassword.length >= 6;
        var areOldAndNewPasswordsEqual = oldPassword === newPassword;
        var isPasswordAlphanumeric;
        newPassword.match(regex) ? isPasswordAlphanumeric = true : isPasswordAlphanumeric = false;

        setState({
            ...state,
            arePasswordsEqual: arePasswordsEqual,
            areOldAndNewPasswordsEqual: areOldAndNewPasswordsEqual,
            isPasswordLengthValid: isPasswordLengthValid,
            isPasswordAlphanumeric: isPasswordAlphanumeric,
            error: false,
            errorMessage: {}
        });

        return (arePasswordsEqual === true && areOldAndNewPasswordsEqual === false && isPasswordLengthValid === true && isPasswordAlphanumeric === true);
    }

}

export default PasswordChangeForm;