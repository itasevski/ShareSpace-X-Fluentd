import React from "react";
import Transition from "../Transition/Transition";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup, IconButton, Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Clear} from "@material-ui/icons";

const RendezvousPointsCustomDialog = (props) => {
    const [state, setState] = React.useState({
        rendezvousPoint: ""
    });

    const handleFieldChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = () => {
        document.getElementById("rendezvousPoint").value = "";

        const rendezvousPoint = state.rendezvousPoint;

        props.handleDialogSubmit(rendezvousPoint);
    }

    const handleRendezvousPointRemove = (index) => {
        props.handleRendezvousPointRemove(index);
    }

    return (
        <Dialog
            open={props.dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleDialogClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="sm"
        >
            {props.isViewDialog === false &&
                <DialogTitle id="alert-dialog-slide-title">Add rendezvous points</DialogTitle>
            }
            {props.isViewDialog === true &&
                <DialogTitle id="alert-dialog-slide-title">Added rendezvous points</DialogTitle>
            }
            <DialogContent>
                <FormGroup id={props.isViewDialog === true ? "" : "rendezvousPointsForm"}>
                    {props.isViewDialog === true ?
                        (
                            props.rendezvousPoints.length > 0 ?
                                props.rendezvousPoints.map((rendezvousPoint, index) => {
                                    return (
                                        <Typography variant="subtitle1">
                                            <IconButton onClick={() => handleRendezvousPointRemove(index)} style={{ marginRight: "5px" }}>
                                                <Clear style={{ fontSize: "15px" }}/>
                                            </IconButton>
                                            {rendezvousPoint}
                                        </Typography>
                                    )
                                }) :
                                <Typography variant="h6" color="textSecondary">No rendezvous points added.</Typography>
                        ) :
                        (
                            <TextField
                                id="rendezvousPoint"
                                name="rendezvousPoint"
                                label="Type rendezvous point related to your offer..."
                                required
                                fullWidth
                                onChange={handleFieldChange}
                            />
                        )}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleDialogClose} color="primary">
                    Close
                </Button>
                {props.isViewDialog === false &&
                <Button
                    type="button"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default RendezvousPointsCustomDialog;