import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {CircularProgress, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import StyleTwo from "../../../Utilities/Styles/SecurityFormStyles/StyleTwo";
import {CheckCircle, Error} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import ShareSpaceService from "../../../Services/ShareSpaceService";

const LoginForm = (props) => {
    const classes = StyleTwo();

    const history = useHistory();
    const [state, setState] = React.useState({
        username: "",
        password: "",

        error: false,
        errorMessage: {},

        loginInProgress: false
    });

    const handleFieldChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value.trim()
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if(localStorage.getItem("successfulRegistration") !== null) localStorage.removeItem("successfulRegistration");
        if(localStorage.getItem("successfulPasswordChange") !== null) localStorage.removeItem("successfulPasswordChange");

        const username = state.username;
        const password = state.password;

        login(username, password);
    }

    const login = (username, password) => {
        ShareSpaceService.login(username, password)
            .then(
                (data) => {
                    localStorage.setItem("userJwtToken", data.data);
                    props.onLogin();
                    history.push("/");
            },
                (err) => {
                    if(err.response === undefined) {
                        setState({
                            ...state,
                            error: true,
                            errorMessage: "Login failed: The ShareSpace server is down.",
                            loginInProgress: false
                        });
                    }
                    else {
                        setState({
                            ...state,
                            error: true,
                            errorMessage: "Invalid authentication attempt for user " + username,
                            loginInProgress: false
                        });
                    }
                });

        setState({
            ...state,
            loginInProgress: true
        });
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {state.loginInProgress === true &&
                    <CircularProgress style={{ margin: "15px" }} />
                    }
                    {localStorage.getItem("successfulRegistration") === "true" &&
                    <Typography variant="subtitle1" style={{ color: "#4BB543" }}>
                        <CheckCircle style={{ color: "#4BB543" }} />&nbsp;
                        You have been successfully registered.
                    </Typography>
                    }
                    {localStorage.getItem("successfulPasswordChange") === "true" &&
                    <Typography variant="subtitle1" style={{ color: "#4BB543" }}>
                        <CheckCircle style={{ color: "#4BB543" }} />&nbsp;
                        Your password has been successfully changed.
                    </Typography>
                    }
                    {state.error === true &&
                    <Typography variant="subtitle1" color="secondary">
                        <Error color="secondary" />&nbsp;
                        {state.errorMessage}
                    </Typography>
                    }
                    <form className={classes.form} onSubmit={handleFormSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={handleFieldChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleFieldChange}
                        />
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary" />}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            {/*<Grid item xs>*/}
                            {/*    <Link to="#" variant="body2" style={{ color: "#3f51b5" }}>*/}
                            {/*        Forgot password?*/}
                            {/*    </Link>*/}
                            {/*</Grid>*/}
                            <Grid item>
                                <Link to="/register" variant="body2" style={{ color: "#3f51b5" }}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default LoginForm;