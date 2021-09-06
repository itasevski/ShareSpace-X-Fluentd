import React, {useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {CircularProgress, FormLabel, Radio, RadioGroup, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Container from "@material-ui/core/Container";
import StyleTwo from "../../../Utilities/Styles/SecurityFormStyles/StyleTwo";
import {Error} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import ShareSpaceService from "../../../Services/ShareSpaceService";
import MuiPhoneNumber from "material-ui-phone-number";

const RegisterForm = (props) => {
    const classes = StyleTwo();

    const history = useHistory();
    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        city: "",
        municipality: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
        type: "PASSENGER",

        countryCode: "",

        arePasswordsEqual: true,
        isPasswordLengthValid: true,
        isPasswordAlphanumeric: true,
        isPhoneNumberValid: true,

        error: false,
        errorMessage: {},

        registerInProgress: false
    });

    useEffect(() => {
        setState({
            ...state,
            city: props.userCity,
            municipality: props.userMunicipality,
            countryCode: document.getElementById("phoneNumber").value
        });
    }, [props.userCity]);

    const handleFieldChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handlePhoneFieldChange = (value) => {
        setState({
            ...state,
            phoneNumber: value
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const phoneNumber = state.phoneNumber;

        if(!validatePhoneNumber(phoneNumber)) {
            console.error("Invalid phone number");
            return;
        }

        const firstName = state.firstName;
        const lastName = state.lastName;
        const city = state.city;
        const municipality = state.municipality;
        const email = state.email;
        const username = state.username;
        const password = state.password;
        const confirmPassword = state.confirmPassword;
        const type = state.type;

        if(validatePassword(password, confirmPassword)) {
            register(firstName, lastName, city, municipality, email, phoneNumber, username, password, confirmPassword, type);
        }
        else {
            console.error("Registration failed.");
        }
    }

    const register = (firstName, lastName, city, municipality, email, phoneNumber, username, password, confirmPassword, type) => {
        ShareSpaceService.register(firstName, lastName, city, municipality, email, phoneNumber, username, password, confirmPassword, type)
            .then(
                (data) => {
                    localStorage.setItem("successfulRegistration", "true");
                    console.log(username + ": Successfully registered.");
                    history.push("/login");
                },
                (err) => {
                    if(err.response === undefined) {
                        setState({
                            ...state,
                            error: true,
                            errorMessage: "Registration failed: The ShareSpace server is down.",
                            registerInProgress: false
                        });
                    }
                    else {
                        setState({
                            ...state,
                            error: true,
                            errorMessage: err.response.status + ": " + err.response.data.errorMessage,
                            registerInProgress: false
                        });
                    }
                });

        setState({
            ...state,
            registerInProgress: true
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {state.registerInProgress === true &&
                <CircularProgress style={{ margin: "15px" }} />
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
                {state.isPhoneNumberValid === false &&
                <Typography variant="subtitle1" color="secondary">
                    <Error color="secondary" />&nbsp;
                    Invalid phone number
                </Typography>
                }
                {state.error === true &&
                <Typography variant="subtitle1" color="secondary">
                    <Error color="secondary" />&nbsp;
                    {state.errorMessage}
                </Typography>
                }
                <form className={classes.form} onSubmit={handleFormSubmit} style={{ marginTop: "25px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoComplete="fname"
                                autoFocus
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="city"
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label={state.city === "" ? "City" : ""}
                                value={state.city}
                                autoComplete="city"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="municipality"
                                label={state.municipality === "" ? "Municipality" : ""}
                                value={state.municipality}
                                name="municipality"
                                autoComplete="municipality"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <span style={{ color: "#3f51b5", fontSize: "12px", marginLeft: "10px" }}>It is recommended that you don't change these two fields (city and municipality) and leave them pre-filled by our geolocation services.</span>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPhoneNumber
                                variant="outlined"
                                fullWidth
                                required
                                id="phoneNumber"
                                label="Phone number"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                defaultCountry={"mk"}
                                value={state.phoneNumber}
                                onChange={handlePhoneFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel component="legend">Register as: </FormLabel>
                            <RadioGroup aria-label="type"
                                        name="type"
                                        value={state.type}
                                        onChange={handleFieldChange}
                                        style={{ marginTop: "10px" }}>
                                <FormControlLabel value="PASSENGER" control={<Radio color="primary" />} label="Passenger" />
                                <FormControlLabel value="DRIVER" control={<Radio color="primary" />} label="Driver" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2" style={{ color: "#3f51b5" }}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

    function validatePassword(password, confirmPassword) {
        var regex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))/;

        var arePasswordsEqual = password === confirmPassword;
        var isPasswordLengthValid = password.length >= 6;
        var isPasswordAlphanumeric;
        password.match(regex) ? isPasswordAlphanumeric = true : isPasswordAlphanumeric = false;

        setState({
            ...state,
            arePasswordsEqual: arePasswordsEqual,
            isPasswordLengthValid: isPasswordLengthValid,
            isPasswordAlphanumeric: isPasswordAlphanumeric,
            isPhoneNumberValid: true
        });

        return (arePasswordsEqual === true && isPasswordLengthValid === true && isPasswordAlphanumeric === true);
    }

    function validatePhoneNumber(phoneNumber) {
        var isPhoneNumberValid = (phoneNumber.length >= 8 && phoneNumber.length <= 16);

        setState({
            ...state,
            isPhoneNumberValid: isPhoneNumberValid
        });

        return isPhoneNumberValid;
    }

}

export default RegisterForm;