import React from "react";
import Transition from "../Transition/Transition";
import {
    Checkbox, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup, FormHelperText,
    FormLabel
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "./FiltersCustomDialog.css";
import {Error} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

const FiltersCustomDialog = (props) => {
    const [state, setState] = React.useState({
        myLocation: true,
        myOffers: false,
        passengerOffers: false,
        driverOffers: false,
        createdToday: false,
        createdYesterday: false,
        personLimitOneFive: false,
        personLimitSixTen: false,
        selectionError: false
    });

    const handleFilterChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
    }

    const handleDialogApply = () => {
        setState({
            ...state,
            selectionError: false
        });
        var dialogState = state;
        props.appliedFiltersHandler(dialogState);
        props.handleDialogClose();
    }

    const validateFilters = () => {
        if ((state.passengerOffers === true && state.driverOffers === true)
        || (state.createdToday === true && state.createdYesterday === true)
        || (state.personLimitOneFive === true && state.personLimitSixTen === true)) {
            setState({
                ...state,
                selectionError: true
            });
            return;
        }

        handleDialogApply();
    }

    return (
        <Dialog
            open={props.dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleDialogClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Select filters</DialogTitle>
            {state.selectionError === true &&
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Typography variant="subtitle1" color="secondary">
                                <Error color="secondary" />&nbsp;
                                Please select only one filter per row
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            }
            <DialogContent>
                <FormLabel component="legend">Available filters:</FormLabel>
                <FormHelperText>You can only select one per row</FormHelperText>
                <FormGroup>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container>
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={state.myLocation} onChange={handleFilterChange} name="myLocation" />}
                                    label="My location"
                                />
                            </Grid>
                            <hr className="horizontalRule" />
                            <Grid container>
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={state.myOffers} onChange={handleFilterChange} name="myOffers" />}
                                    label="My offers"
                                />
                            </Grid>
                            <hr className="horizontalRule" />
                            <Grid container>
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={state.passengerOffers} onChange={handleFilterChange} name="passengerOffers" />}
                                    label="Passenger offers"
                                />
                                <hr className="horizontalRule" />
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={state.createdToday} onChange={handleFilterChange} name="createdToday" />}
                                    label="Created today"
                                />
                                <hr className="horizontalRule" />
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={state.personLimitOneFive} onChange={handleFilterChange} name="personLimitOneFive" />}
                                    label="Person limit (1-5)"
                                />
                                <hr className="horizontalRule" />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Box style={{ height: "40%" }}>
                                <Grid container>
                                </Grid>
                            </Box>
                            <Grid container>
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={state.driverOffers} onChange={handleFilterChange} name="driverOffers" />}
                                    label="Driver offers"
                                />
                                <hr className="horizontalRule" />
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={state.createdYesterday} onChange={handleFilterChange} name="createdYesterday" />}
                                    label="Created yesterday"
                                />
                                <hr className="horizontalRule" />
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={state.personLimitSixTen} onChange={handleFilterChange} name="personLimitSixTen" />}
                                    label="Person limit (6-10)"
                                />
                                <hr className="horizontalRule" />
                            </Grid>
                        </Grid>
                    </Grid>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleDialogClose} color="primary">
                    Close
                </Button>
                <Button onClick={validateFilters} color="primary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FiltersCustomDialog;