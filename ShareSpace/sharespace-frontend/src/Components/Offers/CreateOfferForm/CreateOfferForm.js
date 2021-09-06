import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {
    CircularProgress,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup, Typography
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import RendezvousPointsCustomDialog from "../../../Utilities/RendezvousPointsCustomDialog/RendezvousPointsCustomDialog";
import {Link, useHistory} from "react-router-dom";
import {Error} from "@material-ui/icons";
import ShareSpaceService from "../../../Services/ShareSpaceService";
import {format} from "date-fns";

const CreateOfferForm = (props) => {
    const history = useHistory();

    const [state, setState] = React.useState({
        personLimit: "",
        city: "",
        municipality: "",
        transportationVehicle: "TAXI",
        startDate: new Date(),
        viewDialogOpen: false,
        addDialogOpen: false,
        rendezvousPoints: [],
        destinations: [
            { destination: "Taftalidze" },
            { destination: "Vlae" },
            { destination: "Gorno Nerezi" },
            { destination: "Dolno Nerezi" },
            { destination: "Karposh 1" },
            { destination: "Karposh 2" },
            { destination: "Karposh 3" },
            { destination: "Karposh 4" },
            { destination: "Kisela Voda" },
            { destination: "Sopishte" },
            { destination: "Pripor" },
            { destination: "Vodno" },
            { destination: "Centar" },
            { destination: "Novo Lisiche" },
            { destination: "Staro Lisiche" },
            { destination: "Chair" },
            { destination: "Butel" }
        ],

        isRendezvousPointFieldValid: true,
        isPersonLimitValid: true,
        isDateValid: true,

        error: false,
        errorMessage: "",

        offerCreationInProgress: false
    });

    useEffect(() => {
        setState({
            ...state,
            city: props.userCity,
            municipality: props.userMunicipality
        });
    }, [props.userCity]);


    // handlers
    const handleDateChange = (date) => {
        setState({
            ...state,
            startDate: date
        });
    };

    const handleAddDialogOpen = () => {
        setState({
            ...state,
            addDialogOpen: true
        });
    };

    const handleViewDialogOpen = () => {
        setState({
            ...state,
            viewDialogOpen: true
        });
    };

    const handleAddDialogSubmit = (rendezvousPoint) => {
        processAddedRendezvousPoint(rendezvousPoint);
    };

    const handleViewDialogRendezvousPointRemove = (index) => {
        removeAddedRendezvousPoint(index);
    }

    const handleAddDialogClose = () => {
        setState({
            ...state,
            addDialogOpen: false
        });
    }

    const handleViewDialogClose = () => {
        setState({
            ...state,
            viewDialogOpen: false
        });
    }

    const handleFieldChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const rendezvousPoints = state.rendezvousPoints;
        const personLimit = state.personLimit;
        var startDate = state.startDate;

        if(!validate(rendezvousPoints, personLimit, startDate)) return;

        startDate = format(startDate, "dd/MM/yyyy HH:mm");

        const type = props.userType === "PASSENGER" ?
            "PASSENGER_OFFER" : "DRIVER_OFFER";
        const transportationVehicle = props.userType === "PASSENGER" ?
            state.transportationVehicle : "PERSONAL_VEHICLE";
        const city = state.city;
        const municipality = state.municipality;
        const destination = document.getElementById("destination").value;

        createOffer(type, transportationVehicle, startDate, city, municipality, personLimit, destination, rendezvousPoints);
    }

    const createOffer = (type, transportationVehicle, startDate, city, municipality, personLimit, destination, rendezvousPoints) => {
        ShareSpaceService.createOffer(
            localStorage.getItem("userJwtToken"),
            props.userId,
            type, transportationVehicle, startDate, city, municipality, personLimit, destination, rendezvousPoints)
            .then((data) => {
                props.onOfferCreate();
                history.push("/offers");
            }, (err) => {
                if(err.response === undefined) {
                    setState({
                        ...state,
                        error: true,
                        errorMessage: "Saving failed: The ShareSpace server is down.",
                        offerCreationInProgress: false
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
                        offerCreationInProgress: false
                    });
                }
            });

        setState({
            ...state,
            offerCreationInProgress: true
        });
    }

    return (
        <React.Fragment>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={3}>
                    {state.error === true &&
                    <Grid item xs={12} style={{ marginTop: "-20px", marginBottom: "15px" }}>
                        <Grid container justifyContent="center">
                            <Typography variant="subtitle1" color="secondary">
                                <Error color="secondary" />&nbsp;
                                {state.errorMessage}
                            </Typography>
                        </Grid>
                    </Grid>
                    }
                    {state.isRendezvousPointFieldValid === false &&
                    <Grid item xs={12} style={{ marginTop: "-20px", marginBottom: "15px" }}>
                        <Grid container justifyContent="center">
                            <Typography variant="subtitle1" color="secondary">
                                <Error color="secondary" />&nbsp;
                                There must be at least 1 rendezvous point
                            </Typography>
                        </Grid>
                    </Grid>
                    }
                    {state.isPersonLimitValid === false &&
                    <Grid item xs={12} style={{ marginTop: "-20px", marginBottom: "15px" }}>
                        <Grid container justifyContent="center">
                            <Typography variant="subtitle1" color="secondary">
                                <Error color="secondary" />&nbsp;
                                Person limit must be in range 2-10
                            </Typography>
                        </Grid>
                    </Grid>
                    }
                    {state.isDateValid === false &&
                    <Grid item xs={12} style={{ marginTop: "-20px", marginBottom: "15px" }}>
                        <Grid container justifyContent="center">
                            <Typography variant="subtitle1" color="secondary">
                                <Error color="secondary" />&nbsp;
                                Invalid date
                            </Typography>
                        </Grid>
                    </Grid>
                    }
                    <Grid item xs={10}>
                        <FormLabel htmlFor="rendezvousPoints">Rendezvous points</FormLabel>
                        <TextField
                            required
                            variant="outlined"
                            id="rendezvousPoints"
                            name="rendezvousPoints"
                            label={state.rendezvousPoints.length > 0 ? "" : "Add rendezvous points..."}
                            disabled
                            fullWidth
                            style={{ marginTop: "15px" }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box mt={0}>
                            <Button variant="contained" color="primary" style={{ marginTop: "10px", marginBottom: "10px" }} onClick={handleViewDialogOpen}>
                                View
                            </Button>
                            <Button variant="contained" style={{ backgroundColor: "green", color: "white" }} onClick={handleAddDialogOpen}>
                                Add
                            </Button>
                        </Box>
                        <RendezvousPointsCustomDialog rendezvousPoints={state.rendezvousPoints}
                                                      dialogOpen={state.viewDialogOpen}
                                                      handleDialogOpen={handleViewDialogOpen}
                                                      handleDialogClose={handleViewDialogClose}
                                                      handleRendezvousPointRemove={handleViewDialogRendezvousPointRemove}
                                                      isViewDialog={true}
                        />
                        <RendezvousPointsCustomDialog dialogOpen={state.addDialogOpen}
                                                      handleDialogOpen={handleAddDialogOpen}
                                                      handleDialogClose={handleAddDialogClose}
                                                      handleDialogSubmit={handleAddDialogSubmit}
                                                      isViewDialog={false} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel htmlFor="destination">Destination</FormLabel>
                        <Autocomplete
                            options={state.destinations}
                            freeSolo
                            id="destination"
                            getOptionLabel={(option) => option.destination}
                            renderInput={(params) => <TextField {...params}
                                                                label="Add destination..."
                                                                name="destination"
                                                                required
                                                                />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel htmlFor="personLimit">Person limit</FormLabel>
                        <TextField
                            required
                            id="personLimit"
                            name="personLimit"
                            label="Input person limit..."
                            type="number"
                            fullWidth
                            onChange={handleFieldChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel htmlFor="personLimit">City</FormLabel>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label={state.city !== "" ? "" : "Input offer city..."}
                            value={state.city}
                            type="text"
                            fullWidth
                            onChange={handleFieldChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel htmlFor="personLimit">Municipality</FormLabel>
                        <TextField
                            required
                            id="municipality"
                            name="municipality"
                            label={state.municipality !== "" ? "" : "Input offer municipality..."}
                            value={state.municipality}
                            type="text"
                            fullWidth
                            onChange={handleFieldChange}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <FormLabel htmlFor="date">Date</FormLabel>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                required
                                fullWidth
                                margin="normal"
                                id="date"
                                name="date"
                                label="Pick a date"
                                format="dd/MM/yyyy"
                                value={state.startDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <span style={{ fontSize: "13px", color: "red" }} >* NOTE: Date and time must be 1h (at least) - 72h (at most) from now</span>
                    </Grid>
                    <Grid item xs={5}>
                        <FormLabel htmlFor="time">Time</FormLabel>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                required
                                fullWidth
                                margin="normal"
                                id="time"
                                name="time"
                                label="Pick a time"
                                value={state.startDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    {props.userType === "PASSENGER" &&
                    <Grid item xs={12}>
                        <FormLabel component="legend">Offer transport vehicle</FormLabel>
                        <RadioGroup aria-label="transportationVehicle"
                                    name="transportationVehicle"
                                    value={state.transportationVehicle}
                                    onChange={handleFieldChange}
                                    style={{ marginTop: "10px" }}>
                            <FormControlLabel value="TAXI" control={<Radio color="primary" />} label="Taxi" />
                            <FormControlLabel value="BUS" control={<Radio color="primary" />} label="Bus" />
                            <FormControlLabel value="FERRY" control={<Radio color="primary" />} label="Ferry" />
                            <FormControlLabel value="SUBWAY" control={<Radio color="primary" />} label="Subway" />
                        </RadioGroup>
                    </Grid>
                    }
                    <Grid item xs={12}>
                        <Box mt={2}>
                            <Grid container justifyContent="flex-end">
                                <Link to="/offers" style={{ textDecoration: "none", color: "#3f51b5" }}>
                                    <Button
                                        type="button"
                                        color="primary"
                                        variant="outlined"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginLeft: "15px" }}
                                >
                                    Create
                                    {state.offerCreationInProgress === true &&
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

    // functions
    function fillRendezvousPointsTextField(rendezvousPoint) {
        var rendezvousPointsTextField = document.getElementById("rendezvousPoints");

        rendezvousPointsTextField.value === "" ?
            rendezvousPointsTextField.value += rendezvousPoint :
            rendezvousPointsTextField.value += ", " + rendezvousPoint
    }

    function updateRendezvousPointsTextField() {
        var rendezvousPointsTextField = document.getElementById("rendezvousPoints");
        rendezvousPointsTextField.value = "";

        for(var i = 0; i<state.rendezvousPoints.length; i++) {
            i === state.rendezvousPoints.length - 1 ?
                rendezvousPointsTextField.value += state.rendezvousPoints[i] :
                rendezvousPointsTextField.value += state.rendezvousPoints[i] + ", "
        }
    }

    function processAddedRendezvousPoint(rendezvousPoint) {
        var rendezvousPoints = state.rendezvousPoints;

        rendezvousPoints.push(rendezvousPoint);

        setState({
            ...state,
            rendezvousPoints: rendezvousPoints
        });

        fillRendezvousPointsTextField(rendezvousPoint);
    }

    function removeAddedRendezvousPoint(index) {
        var rendezvousPoints = state.rendezvousPoints;

        rendezvousPoints.splice(index, 1);

        setState({
            ...state,
            rendezvousPoints: rendezvousPoints
        });

        updateRendezvousPointsTextField();
    }

    function validate(rendezvousPoints, personLimit, startDate) {
        var isRendezvousPointFieldValid = rendezvousPoints.length !== 0;
        var isPersonLimitValid = (personLimit >= 2 && personLimit <= 10);

        var now = new Date();
        const threeDaysSeconds = 259200;
        const oneHourSeconds = 3600;
        var interval = Math.floor((startDate - now) / 1000);

        var isDateValid = interval >= oneHourSeconds && interval <= threeDaysSeconds;

        setState({
            ...state,
            isRendezvousPointFieldValid: isRendezvousPointFieldValid,
            isPersonLimitValid: isPersonLimitValid,
            isDateValid: isDateValid
        });

        return (isRendezvousPointFieldValid === true && isPersonLimitValid === true && isDateValid === true);
    }

}

export default CreateOfferForm;