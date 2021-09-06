import React, {useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Logo from "../../../Images/logo.png";
import "./ProfileEditForm.css";
import {Error, Facebook, Instagram, Twitter} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiPhoneNumber from "material-ui-phone-number";
import Box from "@material-ui/core/Box";
import {Link, useHistory} from "react-router-dom";
import ShareSpaceService from "../../../Services/ShareSpaceService";
import {CircularProgress} from "@material-ui/core";

const ProfileEditForm = (props) => {
    const history = useHistory();

    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        city: "",
        municipality: "",
        vehicleModel: "",
        phoneNumber: "",
        bio: "",
        facebookLink: "",
        twitterLink: "",
        instagramLink: "",
        type: "",

        countryCode: "",

        error: false,
        errorMessage: "",

        updateInProgress: false
    });

    useEffect(() => {
        setState({
            ...state,
            firstName: props.userInfo.firstName,
            lastName: props.userInfo.lastName,
            city: props.userInfo.city,
            municipality: props.userInfo.municipality,
            vehicleModel: props.userInfo.vehicleModel,
            phoneNumber: props.userInfo.phoneNumber === null ? "" : props.userInfo.phoneNumber,
            bio: props.userInfo.bio,
            facebookLink: props.userInfo.facebookLink,
            twitterLink: props.userInfo.twitterLink,
            instagramLink: props.userInfo.instagramLink,
            type: props.userInfo.type,
            countryCode: document.getElementById("phoneNumber").value
        });
    }, [props.userInfo]);

    const handleFieldChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const handlePhoneFieldChange = (value) => {
        setState({
            ...state,
            phoneNumber: value
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const phoneNumber = state.phoneNumber;

        if(validatePhoneNumber(phoneNumber)) {
            console.error("Invalid phone number.");
            return;
        }

        const firstName = state.firstName !== "" ? state.firstName : props.userInfo.firstName;
        const lastName = state.lastName !== "" ? state.lastName : props.userInfo.lastName;
        const city = state.city !== "" ? state.city : props.userInfo.city;
        const municipality = state.municipality !== "" ? state.municipality : props.userInfo.municipality;
        const bio = state.bio !== "" ? state.bio : null;
        const facebookLink = state.facebookLink !== "" ? state.facebookLink : null;
        const twitterLink = state.twitterLink !== "" ? state.twitterLink : null;
        const instagramLink = state.instagramLink !== "" ? state.instagramLink : null;
        const type = state.type;
        const vehicleModel = state.vehicleModel !== "" ? state.vehicleModel : null;

        profileEdit(firstName, lastName, city, municipality, phoneNumber, bio, facebookLink, twitterLink, instagramLink, type, vehicleModel);
    }

    const profileEdit = (firstName, lastName, city, municipality, phoneNumber, bio, facebookLink, twitterLink, instagramLink, type, vehicleModel) => {
        ShareSpaceService.updateCurrentUser(
            localStorage.getItem("userJwtToken"),
            props.userInfo.id,
            firstName, lastName, city, municipality, phoneNumber, bio, facebookLink, twitterLink, instagramLink, type, vehicleModel)
            .then(
                (data) => {
                    setState({
                        ...state,
                        updateInProgress: false
                    });
                    props.onProfileEdit(data.data);
                    history.push("/profile");
                },
                (err) => {
                    if(err.response === undefined) {
                        setState({
                            ...state,
                            error: true,
                            errorMessage: "Saving failed: The ShareSpace server is down.",
                            updateInProgress: false
                        });
                    }
                    else {
                        props.onServerError();
                    }
                });

        setState({
            ...state,
            updateInProgress: true
        });
    }

    return (
        <React.Fragment>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={6} style={{ backgroundColor: "#fbfbfb" }}>
                        <Grid container>
                            <img src={Logo} alt="ShareSpace Logo" id="profileEditLogo" />
                            <Typography variant="h4" style={{ color: "gray" }}>MEMBER</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid container justifyContent="center" className="profileEditInfo">
                                    <Button variant="outlined" color="primary" component="label" disabled>
                                        Change profile picture
                                        <input
                                            type="file"
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justifyContent="center" className="profileEditInfo">
                                    <Link to="/profile/edit/changePassword" style={{ textDecoration: "none", color: "#3f51b5" }}>
                                        <Button variant="outlined" color="primary">
                                            Change password
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        {state.error === true &&
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" className="profileEditInfo">
                                <Typography variant="subtitle1" color="secondary">
                                    <Error color="secondary" />&nbsp;
                                    {state.errorMessage}
                                </Typography>
                            </Grid>
                        </Grid>
                        }
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={6}>
                                <Grid container justifyContent="center" className="profileEditInfo">
                                    <TextField
                                        variant="outlined"
                                        id="firstName"
                                        name="firstName"
                                        label={state.firstName === "" ? "Change first name" : ""}
                                        fullWidth
                                        value={state.firstName}
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justifyContent="center" className="profileEditInfo">
                                    <TextField
                                        variant="outlined"
                                        id="lastName"
                                        name="lastName"
                                        label={state.lastName === "" ? "Change last name" : ""}
                                        fullWidth
                                        value={state.lastName}
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={6}>
                                <Grid container justifyContent="center" className="profileEditInfo">
                                    <TextField
                                        variant="outlined"
                                        id="city"
                                        name="city"
                                        label={state.city === "" ? "Change your city" : ""}
                                        fullWidth
                                        value={state.city}
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justifyContent="center" className="profileEditInfo">
                                    <TextField
                                        variant="outlined"
                                        id="municipality"
                                        name="municipality"
                                        label={state.municipality === "" ? "Change your municipality" : ""}
                                        fullWidth
                                        value={state.municipality}
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {props.userInfo.type === "DRIVER" &&
                        <Grid container justifyContent="center" className="profileEditInfo">
                            <TextField
                                variant="outlined"
                                id="vehicleModel"
                                name="vehicleModel"
                                label={state.vehicleModel === null || state.vehicleModel === "" ? "Set vehicle model" : ""}
                                fullWidth
                                value={state.vehicleModel}
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        }
                        <Grid container justifyContent="center" className="profileEditInfo">
                            <MuiPhoneNumber
                                variant="outlined"
                                id="phoneNumber"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                defaultCountry={"mk"}
                                fullWidth
                                value={state.phoneNumber}
                                onChange={handlePhoneFieldChange}
                            />
                        </Grid>
                        <Grid container justifyContent="center" className="profileEditInfo">
                            <TextField
                                multiline
                                rows={4}
                                variant="outlined"
                                id="bio"
                                name="bio"
                                label={state.bio === null || state.bio === "" ? "Set custom bio" : ""}
                                fullWidth
                                value={state.bio}
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid container justifyContent="center">
                            <Facebook style={{ fontSize: "55px" }} />
                            <TextField
                                id="facebookLink"
                                name="facebookLink"
                                label={state.facebookLink === null || state.facebookLink === "" ? "Change facebook link" : ""}
                                style={{ width: "55%" }}
                                value={state.facebookLink}
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid container justifyContent="center">
                            <Twitter style={{ fontSize: "55px" }} />
                            <TextField
                                id="twitterLink"
                                name="twitterLink"
                                label={state.twitterLink === null || state.twitterLink === "" ? "Change twitter link" : ""}
                                style={{ width: "55%" }}
                                value={state.twitterLink}
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Grid container justifyContent="center">
                            <Instagram style={{ fontSize: "55px" }} />
                            <TextField
                                id="instagramLink"
                                name="instagramLink"
                                label={state.instagramLink === null || state.instagramLink === "" ? "Change instagram link" : ""}
                                style={{ width: "55%" }}
                                value={state.instagramLink}
                                onChange={handleFieldChange}
                            />
                        </Grid>
                        <Box mt={7}>
                            <Grid container justifyContent="flex-end">
                                    <Link to="/profile" style={{ textDecoration: "none", color: "#3f51b5" }}>
                                        <Button type="button"
                                                color="primary"
                                                variant="outlined">
                                            Cancel
                                        </Button>
                                    </Link>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginLeft: "15px" }}
                                >
                                    Save
                                    {state.updateInProgress === true &&
                                    <CircularProgress style={{ marginLeft: "10px", color: "white" }} size={15} />
                                    }
                                </Button>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )

    function validatePhoneNumber(phoneNumber) {
        var error = !(phoneNumber.length >= 8 && phoneNumber.length <= 16);

        setState({
            ...state,
            error: error,
            errorMessage: "Invalid phone number",
            updateInProgress: false
        });

        return error;
    }

}

export default ProfileEditForm;